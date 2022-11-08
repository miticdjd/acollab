<?php

namespace App\Repository;

use Illuminate\Pagination\LengthAwarePaginator;
use App\Models\User;
use App\Services\User\Role;
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
     * Get all coordinators
     *
     * @param integer $countryId
     * @param integer $perPage
     * @return LengthAwarePaginator
     */
    public function getAllCoordinators(int $countryId, int $perPage): LengthAwarePaginator
    {

        return User::where('country_id', $countryId)
            ->whereHas('roles', function($query) {

                return $query->where('name', Role::ROLE_COORDINATOR);
            })
            ->paginate($perPage);
    }

    /**
     * Create new user
     * @param array $fields
     * @return User
     */
    public function add(array $fields, $addressId): User
    {
        $user = new User();
        $user->fill($fields);
        $user->password = Hash::make($fields['password']);
        $user->fill(['address_id' => $addressId]);

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
     * Attach counties
     * @param User $user
     * @param array $countiesId
     * @return User
     */
    public function attachCounties(User $user, array $countiesId): User
    {
        $user->counties()->sync($countiesId);

        return $user;
    }

    /**
     * Attach sports
     * @param User $user
     * @param array $sportsId
     * @return User
     */
    public function attachSports(User $user, array $sportsId): User
    {
        $user->sports()->sync($sportsId);

        return $user;
    }

    /**
     * Attach teams
     * @param User $user
     * @param array $teamsId
     * @return User
     */
    public function attachTeams(User $user, array $teamsId): User
    {
        $user->teams()->sync($teamsId);

        return $user;
    }

    /**
     * Attach departments
     * @param User $user
     * @param array $departmentsId
     * @return User
     */
    public function attachDepartments(User $user, array $departmentsId): User
    {
        $user->departments()->sync($departmentsId);

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
    public function update(User $user, array $fields, int $addressId = null): User
    {
        $user->fill($fields);

        if (isset($fields['password'])) {
            $user->password = Hash::make($fields['password']);
        }
        if ($addressId) {
            $user->fill(['address_id' => $addressId]);
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
