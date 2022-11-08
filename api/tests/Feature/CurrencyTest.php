<?php

namespace Tests\Feature;

use App\Models\Currency;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CurrencyTest extends TestCase
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
     * Get all currencies test.
     *
     * @return void
     */
    public function test_can_get_all_currencies(): void
    {
        $currencies = Currency::factory(3)->create();
        $this->getJson(route('currencies.list.all'))
            ->assertStatus(200)
            ->assertJson(['data' => $currencies->toArray()]);
    }

    /**
     * Get all currencies paginated test.
     *
     * @return void
     */
    public function test_can_get_all_currencies_paginated(): void
    {
        Currency::factory(11)->create();
        $this->getJson(route('currencies.list', 'page=2'))
            ->assertStatus(200)
            ->assertJson([
                'meta' => [
                    'current_page' => 2
                ]
            ]);
    }

    /**
     * Get single currency test.
     *
     * @return void
     */
    public function test_can_get_currency(): void
    {
        $currency = Currency::factory()->create();
        $this->getJson(route('currency.details', $currency->id))
            ->assertStatus(200)
            ->assertJson(['data' => $currency->toArray()]);
    }

    /**
     * Create currency test.
     *
     * @return void
     */
    public function test_can_create_currency(): void
    {
        $formData = [
            'name' => 'Dinar',
            'code' => 'RSD',
            'symbol' => 'din',
        ];
        $this->postJson(route('currency.add'), $formData)
            ->assertStatus(201)
            ->assertJson(['data' => $formData]);
    }

    /**
     * Update currency test.
     *
     * @return void
     */
    public function test_can_update_currency(): void
    {
        $currency = Currency::factory()->create();
        $updatedFormData = [
            'name' => 'Dollar',
            'code' => 'USD',
            'symbol' => '$',
        ];
        $this->putJson(route('currency.update', $currency->id), $updatedFormData)
            ->assertStatus(200)
            ->assertJson(['data' => $updatedFormData]);
    }

    /**
     * Delete currency test.
     *
     * @return void
     */
    public function test_can_delete_currency(): void
    {
        $currency = Currency::factory()->create();
        $this->deleteJson(route('currency.remove', $currency->id))
            ->assertStatus(200);
    }
}
