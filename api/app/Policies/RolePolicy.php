<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class RolePolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user have read_roles permission.
     *
     * @param  User  $user
     * @return bool
     */
    public function read(User $user): bool
    {
        return $user->can('read_roles');
    }

    /**
     * Determine whether the user have write_roles permission.
     *
     * @param  User  $user
     * @return bool
     */
    public function write(User $user): bool
    {
        return $user->can('write_roles');
    }
}
