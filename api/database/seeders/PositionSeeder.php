<?php

namespace Database\Seeders;

use App\Models\Position;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PositionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $positions = [
            'name' => [
                'CEO',
                'CTO',
                'COO',
                'CIF',
                'Software engineer',
                'DevOps',
                'QA',
            ]
        ];
        foreach ($positions as $values){
            foreach ($values as $value) {
                $position = new Position();
                $position->create([
                    'name' => $value,
                ]);
            }
        }
    }
}
