<?php

namespace App\Services\Auth;

use App\Models\User;
use App\Repository\UserRepository;
use App\Services\Auth\Exception\InvalidUserCredentialsException;
use App\Services\Auth\Exception\UserCantBeFoundException;
use Illuminate\Support\Facades\Hash;
use Laravel\Passport\PersonalAccessTokenResult;
use App\Services\Audit\EventTypes;
use App\Services\Audit\Event;

class Authenticate
{
    /**
     * @var UserRepository
     */
    private UserRepository $userRepository;

    /**
     * Event service
     */
    private Event $eventService;

    /**
     * Authenticate constructor.
     * @param UserRepository $userRepository
     * @param EventService $eventService
     */
    public function __construct(UserRepository $userRepository, Event $eventService)
    {
        $this->userRepository = $userRepository;
        $this->eventService = $eventService;
    }

    /**
     * Attempt to authenticate user
     * @param string $email
     * @param string $password
     * @return User
     * @throws InvalidUserCredentialsException
     * @throws UserCantBeFoundException
     */
    public function attempt(string $email, string $password): User
    {
        $user = $this->userRepository->getActiveUserByEmail($email);

        if (!$user) {
            throw new UserCantBeFoundException();
        }

        $attempt = Hash::check($password, $user->getAuthPassword());

        if (!$attempt) {
            throw new InvalidUserCredentialsException();
        }

        $this->eventService->addForSpecificUser($user->id, $user->id, User::class, EventTypes::USER_LOGIN, ['user_id' => $user->id]);

        return $user;
    }

    /**
     * Validate user password
     * @param User $user
     * @param string $password
     * @return bool
     */
    public function validatePassword(User $user, string $password): bool
    {
        return Hash::check($password, $user->getAuthPassword());
    }

    /**
     * Create access token
     * @param User $user
     * @return PersonalAccessTokenResult
     */
    public function createAccessToken(User $user): PersonalAccessTokenResult
    {
        return $user->createToken('personal_access_token');
    }
}
