<?php

namespace Database\Seeders;

use App\Models\User;
use App\Services\User\Status;
use App\Services\User\User as UserService;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;
use App\Services\User\Role as RoleService;

class UsersTableSeeder extends Seeder
{
    /**
     * @var UserService
     */
    private UserService $userService;

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
        $administratorRole = Role::where('name', RoleService::ROLE_ADMINISTRATOR)->first();

        $dragan = new User();
        $dragan->first_name = 'Dragan';
        $dragan->last_name = 'Mitić';
        $dragan->email = 'd.mitic@hefesgroup.com';
        $dragan->password = Hash::make('Secret321!');
        $dragan->status = Status::STATUS_ACTIVE;
        $dragan->save();
        $dragan->avatar_url = $this->userService->generateAvatar($dragan->id, $dragan->first_name . ' ' . $dragan->last_name);
        $dragan->save();
        $dragan->assignRole($administratorRole);
    }
}
