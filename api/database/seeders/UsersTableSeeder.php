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
        $managerRole = Role::where('name', RoleService::ROLE_MANAGER)->first();
        $developerRole = Role::where('name', RoleService::ROLE_DEVELOPER)->first();

        $dragan = new User();
        $dragan->first_name = 'Dragan';
        $dragan->last_name = 'Mitić';
        $dragan->email = 'dragan.mitic.2334@metropolitan.ac.rs';
        $dragan->password = Hash::make('Secret321!');
        $dragan->status = Status::STATUS_ACTIVE;
        $dragan->save();
        $dragan->avatar_url = $this->userService->generateAvatar($dragan->id, $dragan->first_name . ' ' . $dragan->last_name);
        $dragan->save();
        $dragan->assignRole($administratorRole);

        $administrator = new User();
        $administrator->first_name = 'Administrator';
        $administrator->last_name = 'Korisnik';
        $administrator->email = 'administrator@metropolitan.ac.rs';
        $administrator->password = Hash::make('Secret321!');
        $administrator->status = Status::STATUS_ACTIVE;
        $administrator->save();
        $administrator->avatar_url = $this->userService->generateAvatar($administrator->id, $administrator->first_name . ' ' . $administrator->last_name);
        $administrator->save();
        $administrator->assignRole($administratorRole);

        $manager = new User();
        $manager->first_name = 'Manager';
        $manager->last_name = 'Korisnik';
        $manager->email = 'manager@metropolitan.ac.rs';
        $manager->password = Hash::make('Secret321!');
        $manager->status = Status::STATUS_ACTIVE;
        $manager->save();
        $manager->avatar_url = $this->userService->generateAvatar($manager->id, $manager->first_name . ' ' . $manager->last_name);
        $manager->save();
        $manager->assignRole($managerRole);

        $developer = new User();
        $developer->first_name = 'Developer';
        $developer->last_name = 'Korisnik';
        $developer->email = 'developer@metropolitan.ac.rs';
        $developer->password = Hash::make('Secret321!');
        $developer->status = Status::STATUS_ACTIVE;
        $developer->save();
        $developer->avatar_url = $this->userService->generateAvatar($developer->id, $developer->first_name . ' ' . $developer->last_name);
        $developer->save();
        $developer->assignRole($developerRole);
    }
}
