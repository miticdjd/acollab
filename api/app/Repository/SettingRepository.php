<?php

namespace App\Repository;

use App\Models\Setting;
use Illuminate\Database\Eloquent\Collection;

class SettingRepository
{
    /**
     * Get all
     *
     * @return Collection
     */
    public function fetchAll(): Collection
    {
        return Setting::orderBy('group', 'ASC')->get();
    }

    /**
     * It will return only value of that setting name
     *
     * @param string $name
     * @return string|null
     */
    public function findOneByName(string $name): ?string
    {
        $setting = Setting::where('name', $name)->first();

        return $setting ? $setting->value : null;
    }

    /**
     * @param  string $group
     *
     * @return int
     */
    public function deleteByGroup(string $group): int
    {
        return Setting::where('group', $group)->delete();
    }

    /**
     *
     * @param string $group
     * @return Collection
     */
    public function findByGroup(string $group): Collection
    {
        return Setting::where('group', $group)->get();
    }

    /**
     *
     * @param  array $settings
     *
     * @return bool
     */
    public function addSettings(array $settings): bool
    {
        return Setting::insert($settings);
    }
}

