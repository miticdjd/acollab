<?php

namespace App\Http\Controllers;

use App\Http\Responses\BasicResponse;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use App\Http\Requests\Setting\GeneralRequest;
use App\Http\Requests\Setting\PaginationRequest;
use App\Services\Setting\Setting;
use Illuminate\Http\Request;
use App\Models\Setting as SettingModel;

class SettingController extends Controller
{
    use AuthorizesRequests;

    /**
     * Get all settings
     * @param Setting $settingService
     * @return JsonResponse
     */
    public function index(Setting $settingService): JsonResponse
    {
        return (new BasicResponse($settingService->getAll()))
            ->response();
    }

    /**
     * Get by group
     * @param string $group
     * @param Setting $settingService
     * @return JsonResponse
     */
    public function get(string $group, Setting $settingService): JsonResponse
    {
        $data = $settingService->getByGroup($group);

        return (new BasicResponse($data))
            ->response();
    }

    /**
     * Save general settings
     * @param GeneralRequest $request
     * @param Setting $settingService
     * @return JsonResponse
     */
    public function general(GeneralRequest $request, Setting $settingService): JsonResponse
    {
        $group = 'general';

        return $this->saveByGroup($group, $request, $settingService);
    }

    /**
     * Save settings by group
     * @param string $group
     * @param Request $request
     * @param Setting $settingService
     * @return JsonResponse
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    private function saveByGroup(string $group, Request $request, Setting $settingService): JsonResponse
    {
        $this->authorize('write', SettingModel::class);

        $settingService->updateByGroup($group, $request->validated());
        $updated = $settingService->getByGroup($group);

        return (new BasicResponse($updated))
            ->setMessage('Uspešno ste promenili podešavanja.')
            ->response();
    }
}
