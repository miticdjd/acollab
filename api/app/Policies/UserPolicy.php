<?php

namespace App\Policies;

use App\Models\User;
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
        return $user->can('read_users');
    }

    /**
     * Determine whether the user have write_users permission.
     *
     * @param  User  $user
     * @return bool
     */
    public function write(User $user): bool
    {
        return $user->can('write_users');
    }
}
