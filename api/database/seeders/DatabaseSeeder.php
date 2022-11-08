<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\Language;
use Database\Seeders\RolesTableSeeder;
use Database\Seeders\SettingTableSeeder;
use Illuminate\Database\Seeder;
use Database\Seeders\UsersTableSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
         $this->call(SettingTableSeeder::class);
         $this->call(RolesTableSeeder::class);
         $this->call(PermissionTableSeeder::class);
         $this->call(UsersTableSeeder::class);
         $this->call(CountrySeeder::class);
         $this->call(CurrencySeeder::class);
         $this->call(CompanyTypeSeeder::class);
         $this->call(DepartmentSeeder::class);
         $this->call(PositionSeeder::class);
         $this->call(CitySeeder::class);
         $this->call(CompanySeeder::class);
         $this->call(LanguageSeeder::class);
    }
}
