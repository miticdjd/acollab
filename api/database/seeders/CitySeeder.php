<?php

namespace Database\Seeders;

use App\Models\City;
use App\Models\Country;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $country = Country::find(1);
        $cities = [
            'name' => [
                'Belgrade',
                'Niš',
            ]
        ];
        foreach ($cities as $values){
            foreach ($values as $value) {
                $city = new City();
                $city->fill([
                    'name' => $value,
                ]);
                $city->country()->associate($country);
                $city->save();
            }
        }
    }
}
