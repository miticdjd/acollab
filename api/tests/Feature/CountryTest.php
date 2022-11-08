<?php

namespace Tests\Feature;

use App\Models\Country;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CountryTest extends TestCase
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
     * Get all countries test.
     *
     * @return void
     */
    public function test_can_get_all_countries(): void
    {
        $countries = Country::factory(3)->create();
        $this->getJson(route('countries.list.all'))
            ->assertStatus(200)
            ->assertJson(['data' => $countries->toArray()]);
    }

    /**
     * Get all countries paginated test.
     *
     * @return void
     */
    public function test_can_get_all_countries_paginated(): void
    {
        Country::factory(11)->create();
        $this->getJson(route('countries.list', 'page=2'))
            ->assertStatus(200)
            ->assertJson([
                'meta' => [
                    'current_page' => 2
                ]
            ]);
    }

    /**
     * Get single country test.
     *
     * @return void
     */
    public function test_can_get_country(): void
    {
        $country = Country::factory()->create();
        $this->getJson(route('country.details', $country->id))
            ->assertStatus(200)
            ->assertJson(['data' => $country->toArray()]);
    }

    /**
     * Create country test.
     *
     * @return void
     */
    public function test_can_create_country(): void
    {
        $formData = ['name' => 'Republic of Serbia'];
        $this->postJson(route('country.add'), $formData)
            ->assertStatus(201)
            ->assertJson(['data' => $formData]);
    }

    /**
     * Update country test.
     *
     * @return void
     */
    public function test_can_update_country(): void
    {
        $country = Country::factory()->create();
        $updatedFormData = ['name' => 'Republic of Italy'];
        $this->putJson(route('country.update', $country->id), $updatedFormData)
            ->assertStatus(200)
            ->assertJson(['data' => $updatedFormData]);
    }

    /**
     * Delete country test.
     *
     * @return void
     */
    public function test_can_delete_country(): void
    {
        $country = Country::factory()->create();
        $this->deleteJson(route('country.remove', $country->id))
            ->assertStatus(200);
    }
}
