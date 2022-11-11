<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Setting;
use App\Services\Setting\Group;

class SettingTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $settings = [
            Group::GROUP_GENERAL => [
                'name' => 'ACollab'
            ]
        ];

        $insert = [];
        foreach ($settings as $group => $groupValues) {
            foreach ($groupValues as $name => $value) {
                $insert[] = [
                    'name' => $name,
                    'value' => $value,
                    'group' => $group,
                ];
            }
        }

        if (count($insert) > 0) {
            Setting::insert($insert);
        }
    }
}
