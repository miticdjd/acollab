<?php

namespace Tests\Feature;

use App\Models\Position;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class PositionTest extends TestCase
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
     * Get all positions test.
     *
     * @return void
     */
    public function test_can_get_all_positions(): void
    {
        $positions = Position::factory(3)->create();
        $this->getJson(route('positions.list.all'))
            ->assertStatus(200)
            ->assertJson(['data' => $positions->toArray()]);
    }

    /**
     * Get all positions paginated test.
     *
     * @return void
     */
    public function test_can_get_all_positions_paginated(): void
    {
        Position::factory(11)->create();
        $this->getJson(route('positions.list', 'page=2'))
            ->assertStatus(200)
            ->assertJson([
                'meta' => [
                    'current_page' => 2
                ]
            ]);
    }

    /**
     * Get single position test.
     *
     * @return void
     */
    public function test_can_get_position(): void
    {
        $position = Position::factory()->create();
        $this->getJson(route('positions.details', $position->id))
            ->assertStatus(200)
            ->assertJson(['data' => $position->toArray()]);
    }

    /**
     * Create position test.
     *
     * @return void
     */
    public function test_can_create_position(): void
    {
        $formData = ['name' => 'CEO'];
        $this->postJson(route('positions.add'), $formData)
            ->assertStatus(201)
            ->assertJson(['data' => $formData]);
    }

    /**
     * Update position test.
     *
     * @return void
     */
    public function test_can_update_position(): void
    {
        $position = Position::factory()->create();
        $updatedFormData = ['name' => 'Project Manager'];
        $this->putJson(route('positions.update', $position->id), $updatedFormData)
            ->assertStatus(200)
            ->assertJson(['data' => $updatedFormData]);
    }

    /**
     * Delete position test.
     *
     * @return void
     */
    public function test_can_delete_position(): void
    {
        $position = Position::factory()->create();
        $this->deleteJson(route('positions.remove', $position->id))
            ->assertStatus(200);
    }
}
