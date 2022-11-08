<?php

namespace Database\Seeders;

use App\Models\User;
use App\Services\User\Status;
use App\Services\User\User as UserService;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;
use App\Services\User\Role as RoleService;
use App\Models\Address;
use App\Repository\AddressRepository;

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
    public function __construct(UserService $userService, AddressRepository $addressRepository)
    {
        $this->userService = $userService;
        $this->addressRepository = $addressRepository;
    }

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $superAdminRole = Role::where('name', RoleService::ROLE_SUPER_ADMIN)->first();

        $draganAddress = $this->addressRepository->add([]);
        $dragan = new User();
        $dragan->first_name = 'Dragan';
        $dragan->last_name = 'Mitić';
        $dragan->email = 'd.mitic@hefesgroup.com';
        $dragan->password = Hash::make('Secret321!');
        $dragan->status = Status::STATUS_ACTIVE;
        $dragan->address_id = $draganAddress->id;
        $dragan->save();
        $dragan->avatar_url = $this->userService->generateAvatar($dragan->id, $dragan->first_name . ' ' . $dragan->last_name);
        $dragan->save();
        $dragan->assignRole($superAdminRole);

        $anastasiaAddress = $this->addressRepository->add([]);
        $anastasia = new User();
        $anastasia->first_name = 'Anastasia';
        $anastasia->last_name = 'Nikolaidou Mitić';
        $anastasia->email = 'a.nikolaidou@hefesgroup.com';
        $anastasia->password = Hash::make('Secret321!');
        $anastasia->status = Status::STATUS_ACTIVE;
        $anastasia->address_id = $anastasiaAddress->id;
        $anastasia->save();
        $anastasia->avatar_url = $this->userService->generateAvatar($anastasia->id, $anastasia->first_name . ' ' . $anastasia->last_name);
        $anastasia->save();
        $anastasia->assignRole($superAdminRole);

        $lukaAddress = $this->addressRepository->add([]);
        $luka = new User();
        $luka->first_name = 'Luka';
        $luka->last_name = 'Anđelković';
        $luka->email = 'l.andjelkovic@hefesgroup.com';
        $luka->password = Hash::make('Secret321!');
        $luka->status = Status::STATUS_ACTIVE;
        $luka->address_id = $lukaAddress->id;
        $luka->save();
        $luka->avatar_url = $this->userService->generateAvatar($luka->id, $luka->first_name . ' ' . $luka->last_name);
        $luka->save();
        $luka->assignRole($superAdminRole);

        $nemanjaAddress = $this->addressRepository->add([]);
        $nemanja = new User();
        $nemanja->first_name = 'Nemanja';
        $nemanja->last_name = 'Đurović';
        $nemanja->email = 'n.djurovic@hefesgroup.com';
        $nemanja->password = Hash::make('Secret321!');
        $nemanja->status = Status::STATUS_ACTIVE;
        $nemanja->address_id = $nemanjaAddress->id;
        $nemanja->save();
        $nemanja->avatar_url = $this->userService->generateAvatar($nemanja->id, $nemanja->first_name . ' ' . $nemanja->last_name);
        $nemanja->save();
        $nemanja->assignRole($superAdminRole);
    }
}
