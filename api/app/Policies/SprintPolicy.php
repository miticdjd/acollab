<?php

namespace App\Policies;

use App\Models\User;
use App\Services\User\Role;
use Illuminate\Auth\Access\HandlesAuthorization;

class SprintPolicy
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
        return $user->hasAnyRole([Role::ROLE_ADMINISTRATOR, Role::ROLE_MANAGER]);
    }

    /**
     * Determine whether the use have delete_users permission.
     *
     * @param User $user
     * @return boolean
     */
    public function delete(User $user): bool
    {
        return $user->hasRole(Role::ROLE_ADMINISTRATOR, Role::ROLE_MANAGER);
    }
}
