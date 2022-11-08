<?php

namespace Tests\Feature;

use App\Models\Department;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class DepartmentTest extends TestCase
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
     * Get all departments test.
     *
     * @return void
     */
    public function test_can_get_all_departments(): void
    {
        $departments = Department::factory(3)->create();
        $this->getJson(route('departments.list.all'))
            ->assertStatus(200)
            ->assertJson(['data' => $departments->toArray()]);
    }

    /**
     * Get all departments paginated test.
     *
     * @return void
     */
    public function test_can_get_all_departments_paginated(): void
    {
        Department::factory(11)->create();
        $this->getJson(route('departments.list', 'page=2'))
            ->assertStatus(200)
            ->assertJson([
                'meta' => [
                    'current_page' => 2
                ]
            ]);
    }

    /**
     * Get single department test.
     *
     * @return void
     */
    public function test_can_get_department(): void
    {
        $department = Department::factory()->create();
        $this->getJson(route('departments.details', $department->id))
            ->assertStatus(200)
            ->assertJson(['data' => $department->toArray()]);
    }

    /**
     * Create department test.
     *
     * @return void
     */
    public function test_can_create_department(): void
    {
        $formData = ['name' => 'Legal'];
        $this->postJson(route('departments.add'), $formData)
            ->assertStatus(201)
            ->assertJson(['data' => $formData]);
    }

    /**
     * Update department test.
     *
     * @return void
     */
    public function test_can_update_department(): void
    {
        $department = Department::factory()->create();
        $updatedFormData = ['name' => 'DDD'];
        $this->putJson(route('departments.update', $department->id), $updatedFormData)
            ->assertStatus(200)
            ->assertJson(['data' => $updatedFormData]);
    }

    /**
     * Delete department test.
     *
     * @return void
     */
    public function test_can_delete_department(): void
    {
        $department = Department::factory()->create();
        $this->deleteJson(route('departments.remove', $department->id))
            ->assertStatus(200);
    }
}
