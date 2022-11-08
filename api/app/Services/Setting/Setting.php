<?php

namespace App\Services\Setting;

use App\Repository\SettingRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\DB;
use App\Models\Setting as SettingModel;

/**
 * Setting specific functionality
 */
class Setting
{
    use AuthorizesRequests;

    /**
     * Setting repository
     * @var SettingRepository
     */
    private SettingRepository $settingRepository;

    /**
     * Setting repository
     * @param SettingRepository $settingRepository
     */
    public function __construct(SettingRepository $settingRepository)
    {
        $this->settingRepository = $settingRepository;
    }

    /**
     * It will return all settings
     *
     * @return array
     */
    public function getAll(): array
    {
        return $this->processResults($this->settingRepository->fetchAll());
    }

    /**
     * It will return all settings related to group
     *
     * @param string $group
     *
     * @return array
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function getByGroup(string $group): array
    {
        $this->authorize('read', SettingModel::class);

        return $this->processResults($this->settingRepository->findByGroup($group), false);
    }

    /**
     * It will return only value of that setting name
     *
     * @param string $name
     *
     * @return string|null
     */
    public function get(string $name): ?string
    {
        return $this->settingRepository->findOneByName($name);
    }

    /**
     * It will insert/update for each setting name in defined group.
     * - delete all values for current group
     * - insert setting (multi array) for current group
     *
     * @param string $group
     * @param array $settings
     *
     * @return bool
     */
    public function updateByGroup(string $group, array $settings): bool
    {
        return DB::transaction(function () use ($group, $settings) {
                $this->settingRepository->deleteByGroup($group);
                $store = [];

                foreach ($settings as $key => $value) {
                    $store[] = [
                        'name' => $key,
                        'value' => $value,
                        'group' => $group
                    ];
                }

                return $this->settingRepository->addSettings($store);
        });
    }

    /**
     * Because of resource response must return Eloquent Collection
     *
     * @param Collection $items
     *
     * @param bool $group
     * @return array
     */
    private function processResults(Collection $items, bool $group = true): array
    {
        $results = [];
        foreach ($items as $item) {
            if ($group) {
                $results[$item->group][$item->name] = $item->value;
            } else {
                $results[$item->name] = $item->value;
            }

        }

        return $results;
    }
}
