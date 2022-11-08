<?php

namespace App\Policies;

use App\Models\Setting;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class SettingPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user have read_settings permission.
     *
     * @param  User  $user
     * @return bool
     */
    public function read(User $user): bool
    {
        return $user->can('read_settings');
    }

    /**
     * Determine whether the user have write_settings permission.
     *
     * @param  User  $user
     * @return bool
     */
    public function write(User $user): bool
    {
        return $user->can('write_settings');
    }
}
