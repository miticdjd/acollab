<?php

namespace App\Policies;

use App\Models\User;
use App\Services\User\Role;
use Illuminate\Auth\Access\HandlesAuthorization;

class UserPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user have read_users permission.
     *
     * @param  User  $user
     * @return bool
     */
    public function read(User $user): bool
    {
        return $user->hasAnyRole([Role::ROLE_ADMINISTRATOR, Role::ROLE_MANAGER, Role::ROLE_DEVELOPER]);
    }

    /**
     * Determine whether the user have write_users permission.
     *
     * @param  User  $user
     * @return bool
     */
    public function write(User $user): bool
    {
        return $user->hasAnyRole([Role::ROLE_ADMINISTRATOR]);
    }

    /**
     * Determine whether the user can update user model.
     *
     * @param User $user
     * @param User $userForUpdate
     * @return boolean
     */
    public function update(User $user, User $userForUpdate): bool
    {
        return $user->hasAnyRole([Role::ROLE_ADMINISTRATOR]) || $user->id === $userForUpdate->id;
    }
}
