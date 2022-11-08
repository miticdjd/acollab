<?php

namespace Database\Seeders;

use App\Models\Season;
use Illuminate\Database\Seeder;

class SeasonTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $seasons = [2022];

        foreach ($seasons as $name) {
            $season = new Season();
            $season->name = $name;
            $season->is_primary = true;
            $season->save();
        }
    }
}
