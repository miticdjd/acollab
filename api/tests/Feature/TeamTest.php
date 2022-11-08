<?php

namespace Tests\Feature;

use App\Models\Team;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class TeamTest extends TestCase
{
    use RefreshDatabase;

    protected $user;

    public function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
        $this->actingAs($this->user);
        $role = Role::create(['name' => 'SuperAdmin']);
        $this->user->assignRole($role);

    }

    /**
     * Get all teams test.
     *
     * @return void
     */
    public function test_can_get_all_teams(): void
    {
        $teams = Team::factory(3)->create();
        $this->getJson(route('teams.list.all'))
            ->assertStatus(200)
            ->assertJson(['data' => $teams->toArray()]);
    }

    /**
     * Get all teams paginated test.
     *
     * @return void
     */
    public function test_can_get_all_teams_paginated(): void
    {
        Team::factory(11)->create();
        $this->getJson(route('teams.list', 'page=2'))
            ->assertStatus(200)
            ->assertJson([
                'meta' => [
                    'current_page' => 2
                ]
            ]);
    }

    /**
     * Get single team test.
     *
     * @return void
     */
    public function test_can_get_team(): void
    {
        $team = Team::factory()->create();
        $this->getJson(route('teams.details', $team->id))
            ->assertStatus(200)
            ->assertJson(['data' => $team->toArray()]);
    }

    /**
     * Create team test.
     *
     * @return void
     */
    public function test_can_create_team(): void
    {
        $formData = ['name' => 'Dev'];
        $this->postJson(route('teams.add'), $formData)
            ->assertStatus(201)
            ->assertJson(['data' => $formData]);
    }

    /**
     * Update team test.
     *
     * @return void
     */
    public function test_can_update_team(): void
    {
        $team = Team::factory()->create();
        $updatedFormData = ['name' => 'Legal'];
        $this->putJson(route('teams.update', $team->id), $updatedFormData)
            ->assertStatus(200)
            ->assertJson(['data' => $updatedFormData]);
    }

    /**
     * Delete team test.
     *
     * @return void
     */
    public function test_can_delete_team(): void
    {
        $team = Team::factory()->create();
        $this->deleteJson(route('teams.remove', $team->id))
            ->assertStatus(200);
    }
}
