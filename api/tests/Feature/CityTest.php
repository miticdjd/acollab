<?php

namespace Tests\Feature;

use App\Models\City;
use App\Models\Country;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class CityTest extends TestCase
{
    use RefreshDatabase;

    protected $user;
    protected $country;

    public function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
        $this->actingAs($this->user);
        $role = Role::create(['name' => 'SuperAdmin']);
        $this->user->assignRole($role);
    }

    /**
     * Get all cities test.
     *
     * @return void
     */
    public function test_can_get_all_cities(): void
    {
        $country =  Country::factory()->create();
        $cities = City::factory(3)->create(['country_id' => $country->id]);
        $this->getJson(route('cities.list.all'))
            ->assertStatus(200)
            ->assertJson(['data' => $cities->toArray()]);
    }

    /**
     * Get all cities paginated test.
     *
     * @return void
     */
    public function test_can_get_all_cities_paginated(): void
    {
        $country =  Country::factory()->create();
        City::factory(11)->create(['country_id' => $country->id]);
        $this->getJson(route('cities.list', 'page=2'))
            ->assertStatus(200)
            ->assertJson([
                'meta' => [
                    'current_page' => 2
                ]
            ]);
    }

    /**
     * Get single city test.
     *
     * @return void
     */
    public function test_can_get_city(): void
    {
        $country =  Country::factory()->create();
        $city = City::factory()->create(['country_id' => $country->id]);
        $this->getJson(route('cities.details', $city->id))
            ->assertStatus(200)
            ->assertJson(['data' => $city->toArray()]);
    }

    /**
     * Create city test.
     *
     * @return void
     */
    public function test_can_create_city(): void
    {
        $country = Country::factory()->create();
        $formData = ['name' => 'Nis', 'country_id' => $country->id];
        $this->postJson(route('cities.add'), $formData)
            ->assertStatus(201)
            ->assertJson(['data' => $formData]);
    }

    /**
     * Update city test.
     *
     * @return void
     */
    public function test_can_update_city(): void
    {
        $country = Country::factory()->create();
        $city = City::factory()->create(['country_id' => $country->id]);
        $updatedFormData = ['name' => 'Nis', 'country_id' => $country->id];
        $this->putJson(route('cities.update', $city->id), $updatedFormData)
            ->assertStatus(200)
            ->assertJson(['data' => $updatedFormData]);
    }

    /**
     * Delete city test.
     *
     * @return void
     */
    public function test_can_delete_city(): void
    {
        $country = Country::factory()->create();
        $city = City::factory()->create(['country_id' => $country->id]);
        $this->deleteJson(route('cities.remove', $city->id))
            ->assertStatus(200);
    }
}
