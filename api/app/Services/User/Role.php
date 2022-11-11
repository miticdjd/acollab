<?php

namespace App\Services\User;

use App\Services\Audit\Event;
use App\Services\Audit\EventTypes;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use App\Repository\RoleRepository;
use App\Services\User\Exception\RoleNotAllowedToChangeException;
use App\Models\Role as RoleModel;
use App\Services\Sorting\Sort;
use App\Services\Sorting\PerPage;
use Illuminate\Auth\Access\AuthorizationException;

class Role
{
    use AuthorizesRequests;
    /**
     * Default role
     */
    public const ROLE_ADMINISTRATOR = 'Administrator';
    public const ROLE_MANAGER = 'Manager';
    public const ROLE_DEVELOPER = 'Developer';

    /**
     * Columns that are sortable
     * @var array
     */
    public const COLUMNS_FOR_SORT = ['name'];

    /**
     * Event service
     */
    private Event $eventService;

    /**
     * @var RoleRepository
     */
    private RoleRepository $roleRepository;

    /**
     * User constructor.
     * @param RoleRepository $roleRepository
     * @param Event $eventService
     */
    public function __construct(RoleRepository $roleRepository, Event $eventService)
    {
        $this->roleRepository = $roleRepository;
        $this->eventService = $eventService;
    }

    /**
     * @return array
     */
    public static function all(): array
    {
        return [
            self::ROLE_ADMINISTRATOR,
            self::ROLE_MANAGER,
            self::ROLE_DEVELOPER
        ];
    }

    /**
     * Get all users from database
     * @return LengthAwarePaginator
     * @throws AuthorizationException
     */
    public function getAllPaginated(Sort $sort, PerPage $perPage): LengthAwarePaginator
    {
        $this->authorize('read', RoleModel::class);

        $sort->setAdditionalColumns(self::COLUMNS_FOR_SORT);
        $column = $sort->getColumn();
        $direction = $sort->getDirection();
        $perPage = $perPage->getPerPage();

        return $this->roleRepository->getAllPaginated($column, $direction, $perPage);
    }

    /**
     * Get all roles
     * @return Collection
     * @throws AuthorizationException
     */
    public function getAll(): Collection
    {
        $this->authorize('read', RoleModel::class);

        return $this->roleRepository->getAll();
    }

    /**
     * Add new role
     * @param array $fields
     * @return RoleModel
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function add(array $fields): RoleModel
    {
        $this->authorize('write', RoleModel::class);

        $fields['guard_name'] = 'api';
        $role = $this->roleRepository->add($fields);

        if (isset($fields['permissions']) && is_array($fields['permissions'])) {
            $this->roleRepository->attachPermissions($role, $fields['permissions']);
        }

        $this->eventService->add($role->id, RoleModel::class, EventTypes::ENTITY_CREATED, $fields);

        return $role;
    }

    /**
     * Save role data
     * @param RoleModel $role
     * @param array $data
     * @return RoleModel
     * @throws RoleNotAllowedToChangeException
     * @throws AuthorizationException
     */
    public function update(RoleModel $role, array $data): RoleModel
    {
        $this->authorize('write', RoleModel::class);

        $original = $role->getOriginal();

        if ($this->isNotAllowedToChange($role)) {
            throw new RoleNotAllowedToChangeException();
        }

        $role = $this->roleRepository->update($role, $data);

        if (isset($data['permissions']) && is_array($data['permissions'])) {
            $this->roleRepository->attachPermissions($role, $data['permissions']);
        }

        $changes = $role->getChanges();

        $data = [
            'changes' => $changes,
            'original' => $original,
        ];

        $this->eventService->add($role->id, RoleModel::class, EventTypes::ENTITY_UPDATED, $data);

        return $role;
    }

    /**
     * Remove role
     * @param RoleModel $role
     * @return bool
     * @throws \Exception
     */
    public function remove(RoleModel $role): bool
    {
        $this->authorize('write', RoleModel::class);

        $original = $role->getOriginal();

        if ($this->isNotAllowedToChange($role)) {
            throw new RoleNotAllowedToChangeException();
        }

        $roleDeleted = $this->roleRepository->remove($role);
        $changes = $role->getChanges();

        $data = [
            'changes' => $changes,
            'original' => $original,
        ];
        $this->eventService->add($role->id, RoleModel::class, EventTypes::ENTITY_DELETED, $data);

        return $roleDeleted;
    }

    /**
     * Check if role is not allowed to change
     * @param RoleModel $roleModel
     * @return bool
     */
    public function isNotAllowedToChange(RoleModel $roleModel): bool
    {
        if (in_array($roleModel->name, self::all())) {
            return true;
        }

        return false;
    }
}
