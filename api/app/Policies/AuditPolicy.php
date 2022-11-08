<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class AuditPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user have read_audit permission.
     *
     * @param  User  $user
     * @return bool
     */
    public function read(User $user): bool
    {
        return $user->can('read_audit');
    }
}
