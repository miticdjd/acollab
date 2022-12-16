<?php

namespace Database\Factories;

use App\Models\Issue;
use App\Models\IssueType;
use App\Models\Project;
use App\Models\User;
use App\Services\Issue\Status;
use Illuminate\Database\Eloquent\Factories\Factory;

class IssueFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Issue::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $projectIds = Project::all()->pluck('id')->toArray();
        $issueTypeIds = IssueType::all()->pluck('id')->toArray();
        $developerIds = User::role('Developer')->get()->pluck('id')->toArray();

        $names = [
            'Improve loading of page',
            'Implement new menu system',
            'Add new logo',
            'Add new menu',
            'Add new styles on home page',
            'Add new page for displaying instance statuses',
            'Add new page for displaying instances details',
            'Fix problem with race condition in middleware',
            'Change button color',
            'Find out how to load data from AWS api',
            'Optimize queries on shop page',
            'Fix API problem with timezone',
            'Set new timezone on server',
            'Implement new login system',
            'Implement CRUD for managers',
            'Implement CRUD for developers',
            'Implement CRUD for users',
            'Implement CRUD for projects',
            'Implement CRUD for sprints',
            'Implement CRUD for issues',
            'Implement CRUD for statuses',
            'Implement CRUD for objects',
            'Implement CRUD for articles',
            'Implement CRUD for article items',
            'Implement CRUD for shop',
            'Implement new oAuth routes',
            'Implement new API endpoint for instances',
            'Implement new API endpoints for users',
            'Implement new API endpoints for projects',
            'Implement new API endpoints for sprints',
            'Implement new API endpoints for issues',
            'Implement new API endpoints for statuses',
            'Implement new API endpoints for objects',
            'Implement new API endpoints for articles',
            'Implement new API endpoints for article items',
            'Implement new page for instances',
            'Implement new page for users',
            'Implement new page for projects',
            'Implement new page for sprints',
            'Implement new page for issues',
            'Implement new page for statuses',
            'Implement new page for objects',
            'Implement new page for articles',
            'Implement new page for article items',
        ];

        return [
            'project_id' => $this->faker->randomElement($projectIds),
            'issue_type_id' => $this->faker->randomElement($issueTypeIds),
            'user_id' => $this->faker->randomElement(array_combine($developerIds, [null])), // we should not set this data
            'name' => $this->faker->randomElement($names),
            'description' => $this->faker->paragraph($this->faker->randomElement([3, 5, 7, 9]), true),
            'status' => $this->faker->randomElement(Status::all())
        ];
    }
}
