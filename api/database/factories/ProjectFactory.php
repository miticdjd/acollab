<?php

namespace Database\Factories;

use App\Models\Project;
use App\Services\Project\Status;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProjectFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Project::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $name = $this->faker->company;

        return [
            'name' => $name,
            'code' => strtoupper(substr($name, 0, 3)),
            'description' => $this->faker->paragraph(3, true),
            'status' => Status::STATUS_ACTIVE
        ];
    }
}
