<?php

namespace App\Repository;

use Illuminate\Pagination\LengthAwarePaginator;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserRepository
{
    /**
     * Get all roles
     * @param int $perPage
     * @return LengthAwarePaginator
     */
    public function getAllPaginated(string $column, string $direction, int $perPage): LengthAwarePaginator
    {
        return User::orderBy($column, $direction)->paginate($perPage);
    }

    /**
     * Get all users
     * @param int $perPage
     * @return LengthAwarePaginator
     */
    public function getAll(int $perPage): LengthAwarePaginator
    {
        return User::paginate($perPage);
    }

    /**
     * Create new user
     * @param array $fields
     * @return User
     */
    public function add(array $fields): User
    {
        $user = new User();
        $user->fill($fields);
        $user->password = Hash::make($fields['password']);

        $user->save();

        return $user;
    }

    /**
     * Attach roles
     * @param User $user
     * @param array $rolesId
     * @return User
     */
    public function attachRoles(User $user, array $rolesId): User
    {
        $user->roles()->sync($rolesId);

        return $user;
    }

    /**
     * Update user
     *
     * @param User $user
     * @param array $fields
     *
     * @return User
     */
    public function update(User $user, array $fields): User
    {
        $user->fill($fields);

        if (isset($fields['password'])) {
            $user->password = Hash::make($fields['password']);
        }

        $user->save();

        return $user;
    }

    /**
     * Update current user password
     * @param User $user
     * @param string $password
     * @return User
     */
    public function updatePassword(User $user, string $password): User
    {
        $user->password = Hash::make($password);
        $user->save();

        return $user->refresh();
    }

    /**
     * Update status of a user
     * @param User $user
     * @param string $status
     * @return User
     */
    public function updateStatus(User $user, string $status): User
    {
        $user->status = $status;
        $user->save();

        return $user;
    }

    /**
     * Remove user
     * @param User $user
     * @return bool|null
     * @throws \Exception
     */
    public function remove(User $user): ?bool
    {
        return $user->delete();
    }

    /**
     * Find user by email.
     * @param string $email
     * @return User|null
     */
    public function getByEmail(string $email): ?User
    {
        return User::where('email', $email)->first();
    }

    /**
     * Find user by email.
     *
     * @param string $email
     *
     * @return User|null
     */
    public function getActiveUserByEmail(string $email): ?User
    {
        return User::where('email', $email)->active()->first();
    }
}
