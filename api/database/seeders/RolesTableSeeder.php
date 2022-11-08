<?php

namespace Database\Seeders;

use App\Services\User\Role;
use App\Services\User\User as UserService;
use Illuminate\Database\Seeder;

class RolesTableSeeder extends Seeder
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
        foreach (Role::all() as $roleName) {
            $role = new \App\Models\Role();
            $role->name = $roleName;
            $role->guard_name = 'api';
            $role->save();
        }
    }
}
