<?php

namespace Database\Seeders;

use App\Services\User\Role;
use App\Services\User\User as UserService;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission as Permission;
use App\Services\User\Permission as PermissionService;

class PermissionTableSeeder extends Seeder
{
    /**
     * UsersTableSeeder constructor.
     * @param UserService $userService
     */
    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Permission::create(['name' => PermissionService::READ_SETTINGS, 'guard_name' => 'api']);
        Permission::create(['name' => PermissionService::WRITE_SETTINGS, 'guard_name' => 'api']);

        Permission::create(['name' => PermissionService::READ_USERS, 'guard_name' => 'api']);
        Permission::create(['name' => PermissionService::WRITE_USERS, 'guard_name' => 'api']);

        Permission::create(['name' => PermissionService::READ_ROLES, 'guard_name' => 'api']);
        Permission::create(['name' => PermissionService::WRITE_ROLES, 'guard_name' => 'api']);

        Permission::create(['name' => PermissionService::READ_AUDIT, 'guard_name' => 'api']);

    }
}
