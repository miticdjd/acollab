<?php

namespace App\Repository;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use App\Models\Role;

class RoleRepository
{
    /**
     * Get all roles
     * @param int $perPage
     * @return LengthAwarePaginator
     */
    public function getAllPaginated(string $column, string $direction, int $perPage): LengthAwarePaginator
    {
        return Role::orderBy($column, $direction)->paginate($perPage);
    }

    /**
     * Get all roles
     * @return Collection
     */
    public function getAll(): Collection
    {
        return Role::all();
    }

    /**
     * Create new role
     * @param array $fields
     * @return Role
     */
    public function add(array $fields): Role
    {
        $role = new Role();
        $role->fill($fields);
        $role->save();

        return $role;
    }

    /**
     * Update role
     *
     * @param Role $role
     * @param array $fields
     *
     * @return Role
     */
    public function update(Role $role, array $fields): Role
    {
        $role->fill($fields);
        $role->save();

        return $role->refresh();
    }

    /**
     * Attach permissions
     * @param Role $role
     * @param array $permissionIds
     * @return Role
     */
    public function attachPermissions(Role $role, array $permissionIds): Role
    {
        $role->permissions()->sync($permissionIds);

        return $role;
    }

    /**
     * Remove role
     * @param Role $role
     * @return bool|null
     * @throws \Exception
     */
    public function remove(Role $role): ?bool
    {
        return $role->delete();
    }
}
