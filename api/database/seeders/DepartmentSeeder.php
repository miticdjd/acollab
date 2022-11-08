<?php

namespace Database\Seeders;

use App\Models\Department;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $departments = [
            'name' => [
                'Product development',
                'Services',
                'Research and Development',
                'Quality Assurance',
                'Marketing',
                'Accounting',
                'Legal',
            ]
        ];
        foreach ($departments as $values){
            foreach ($values as $value) {
                $department = new Department();
                $department->create([
                    'name' => $value,
                ]);
            }
        }
    }
}
