<?php

namespace Database\Seeders;

use App\Models\CompanyType;
use App\Models\Country;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CompanyTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $country = Country::find(1);
        $companyTypes = [
            'name' => [
                'd.o.o',
                'PR',
            ]
        ];
        foreach ($companyTypes as $values){
            foreach ($values as $value) {
                $companyType = new CompanyType();
                $companyType->fill([
                    'name' => $value,
                ]);
                $companyType->country()->associate($country);
                $companyType->save();
            }
        }
    }
}
