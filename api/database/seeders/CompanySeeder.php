<?php

namespace Database\Seeders;

use App\Models\Address;
use App\Models\City;
use App\Models\Company;
use App\Models\Country;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $city = City::find(1);
        $country = Country::find(1);
        $address = new Address();
        $address->fill([
            'street' => 'Bulevar Mihajla Pupina',
            'number' => 6,
            'floor' => '19',
            'additional_info' => 'floor 19',
        ]);
        $address->country()->associate($country);
        $address->city()->associate($city);
        $address->save();

        $company = new Company();
        $company->fill([
            'name' => 'HEFES TECHNOLOGY GROUP',
            'name_business' => 'Hefes Technology group doo Beograd-Novi Beograd',
            'name_short' => 'Hefes Technology group doo',
            'incorporation_date' => '11.03.2020',
            'email' => 'office@hefesgroup.com',
            'company_id' => '21567426',
            'vat_id' => '111909858',
            'in_vat' => false,
            'vat' => 20,
        ]);
        $company->address()->associate($address);
        $company->save();

    }
}
