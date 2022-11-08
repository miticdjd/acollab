<?php

namespace App\Services\User;

use App\Models\Address;
use App\Models\Role;
use App\Repository\AddressRepository;
use Illuminate\Pagination\LengthAwarePaginator;
use App\Repository\UserRepository;
use App\Models\User as UserModel;
use App\Services\Auth\Authenticate;
use App\Services\User\Exception\InvalidPasswordException;
use LasseRafn\InitialAvatarGenerator\InitialAvatar;
use App\Services\Media\Uploader;
use App\Services\Sorting\Sort;
use App\Services\Sorting\PerPage;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Auth\Access\AuthorizationException;
use App\Services\Audit\Event;
use App\Services\Audit\EventTypes;

class User
{
    use AuthorizesRequests;

    /**
     * @var UserRepository
     */
    private UserRepository $userRepository;

    /**
     * @var AddressRepository
     */
    private AddressRepository $addressRepository;

    /**
     * @var Authenticate
     */
    private Authenticate $authenticate;

    /**
     * @var Uploader
     */
    private Uploader $uploader;

    /**
     * Updated event service
     */
    private Event $eventService;

    /**
     * Columns that are sortable
     * @var array
     */
    public const COLUMNS_FOR_SORT = ['first_name', 'last_name', 'email', 'status'];

    private string $avatarFolder = 'avatars';

    /**
     * User constructor.
     * @param UserRepository $userRepository
     * @param Authenticate $authenticate
     * @param Uploader $uploader
     * @param AddressRepository $addressRepository
     * @param Event $eventService
     */
    public function __construct(UserRepository $userRepository, Authenticate $authenticate, Uploader $uploader, AddressRepository $addressRepository, Event $eventService)
    {
        $this->userRepository = $userRepository;
        $this->authenticate = $authenticate;
        $this->uploader = $uploader;
        $this->addressRepository = $addressRepository;
        $this->eventService = $eventService;
    }

    /**
     * Get all users from database
     * @return LengthAwarePaginator
     * @throws AuthorizationException
     */
    public function getAllPaginated(Sort $sort, PerPage $perPage): LengthAwarePaginator
    {
        $this->authorize('read', UserModel::class);

        $sort->setAdditionalColumns(self::COLUMNS_FOR_SORT);
        $column = $sort->getColumn();
        $direction = $sort->getDirection();
        $perPage = $perPage->getPerPage();

        return $this->userRepository->getAllPaginated($column, $direction, $perPage);
    }

    /**
     * Get all users from database
     * @return \Illuminate\Pagination\LengthAwarePaginator
     * @throws AuthorizationException
     */
    public function getAll(): LengthAwarePaginator
    {
        $this->authorize('read', UserModel::class);

        return $this->userRepository->getAll(10);
    }

    /**
     * Get all users from database
     * @return \Illuminate\Pagination\LengthAwarePaginator
     */
    public function getAllCoordinatorsByCountry(int $countryId): LengthAwarePaginator
    {
        $perPage = $this->setting->getPagination(10);

        return $this->userRepository->getAllCoordinators($countryId, $perPage);
    }

    /**
     * Add new user
     * @param array $fields
     * @return UserModel
     * @throws AuthorizationException
     */
    public function add(array $fields): UserModel
    {
        $this->authorize('write', UserModel::class);

        $fields['status'] = Status::STATUS_ACTIVE;
        if (isset($fields['address']) && is_array($fields['address'])) {
            $address = $this->addressRepository->add($fields['address']);
        } else {
            $address = $this->addressRepository->add([]);
        }
        $user = $this->userRepository->add($fields, $address->id);

        if (isset($fields['teams']) && is_array($fields['teams'])) {
            $this->userRepository->attachTeams($user, $fields['teams']);
        }

        if (isset($fields['departments']) && is_array($fields['departments'])) {
            $this->userRepository->attachDepartments($user, $fields['departments']);
        }

        if (isset($fields['roles']) && is_array($fields['roles'])) {
            $this->userRepository->attachRoles($user, $fields['roles']);
        }

        $fullName = $user->first_name . " " . $user->last_name;
        $avatarPath = $this->generateAvatar($user->id, $fullName);
        $newData = $user->toArray();
        $newData['avatar_url'] = $avatarPath;
        $user = $this->userRepository->update($user, $newData);
        $this->eventService->add($user->id, UserModel::class, EventTypes::ENTITY_CREATED, $fields);

        return $user;
    }

    /**
     * Save user data
     * @param UserModel $user
     * @param array $data
     * @return UserModel
     * @throws AuthorizationException
     */
    public function update(UserModel $user, array $data): UserModel
    {
        $this->authorize('write', UserModel::class);

        $original = $user->getOriginal();
        $original['address'] = $user->address->getOriginal();

        $addressChanges = null;

        if (isset($data['address'])) {
            $address = $this->addressRepository->update($user->address, $data['address']);
            $addressChanges = $address->getChanges();
        }

        $user = $this->userRepository->update($user, $data, $user->address->id);

        if (isset($data['teams']) && is_array($data['teams'])) {
            $this->userRepository->attachTeams($user, $data['teams']);
        }

        if (isset($data['departments']) && is_array($data['departments'])) {
            $this->userRepository->attachDepartments($user, $data['departments']);
        }

        if (isset($data['roles']) && is_array($data['roles'])) {
            $this->userRepository->attachRoles($user, $data['roles']);
        }

        $changes = $user->getChanges();
        $changes['address'] = ($addressChanges) ?: [];

        $data = [
            'changes' => $changes,
            'original' => $original,
        ];
        $this->eventService->add($user->id, UserModel::class, EventTypes::ENTITY_UPDATED, $data);

        return $user;
    }

    /**
     * Remove user
     * @param UserModel $user
     * @return bool
     * @throws \Exception
     */
    public function remove(UserModel $user): bool
    {
        $this->authorize('write', UserModel::class);

        $original = $user->getOriginal();
        $original['address'] = $user->address->getOriginal();

        $user = $this->userRepository->updateStatus($user, Status::STATUS_REMOVED);
        $userDeleted = $this->userRepository->remove($user);

        $changes = $user->getChanges();
        $changes['address'] = $user->address->getChanges();
        $data = [
            'changes' => $changes,
            'original' => $original,
        ];
        $this->eventService->add($user->id, UserModel::class, EventTypes::ENTITY_DELETED, $data);

        return $userDeleted;
    }

    /**
     * Update current user password
     * @param UserModel $user
     * @param string $currentPassword
     * @param string $password
     * @return UserModel
     * @throws InvalidPasswordException
     */
    public function updatePassword(UserModel $user, string $currentPassword, string $password): UserModel
    {
        if (!$this->authenticate->validatePassword($user, $currentPassword)) {
            throw new InvalidPasswordException(t(''));
        }

        return $this->userRepository->updatePassword($user, $password);
    }

    /**
     * @param int $userId
     * @param string $fullName
     * @return string|null
     */
    public function generateAvatar(int $userId, string $fullName): ?string
    {
        $combination = Colors::generateRandomCombination();
        $initialAvatar = new InitialAvatar();
        $image = $initialAvatar->name($fullName)
            ->background($combination['background'])
            ->color($combination['color'])
            ->preferBold()
            ->size(1000)
            ->generate();

        $content = $image->stream('png', 100);
        $folderPath = $this->avatarFolder . "/$userId";

        return $this->uploader->put($folderPath, $content, 'png', null, true);
    }
}
