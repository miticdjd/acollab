<?php

namespace App\Services\User;

use App\Repository\PermissionRepository;
use Illuminate\Support\Collection;

class Permission
{
    /**
     * Setting permissions
     */
    public const READ_SETTINGS = 'read_settings';
    public const WRITE_SETTINGS = 'write_settings';

    public const READ_USERS = 'read_users';
    public const WRITE_USERS = 'write_users';

    public const READ_ROLES = 'read_roles';
    public const WRITE_ROLES = 'write_roles';

    public const READ_AUDIT = 'read_audit';

    /**
     * @var PermissionRepository
     */
    private PermissionRepository $permissionRepository;

    /**
     * Permission constructor.
     * @param PermissionRepository $permissionRepository
     */
    public function __construct(PermissionRepository $permissionRepository)
    {
        $this->permissionRepository = $permissionRepository;
    }

    /**
     * Get all permissions
     * @return Collection
     */
    public function getAll(): Collection
    {
        return $this->permissionRepository->getAll();
    }
}
