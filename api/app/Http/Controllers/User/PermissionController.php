<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Responses\BasicResponse;
use App\Services\User\Permission;
use Illuminate\Http\JsonResponse;

class PermissionController extends Controller
{
    /**
     * Get all permissions
     * @param Permission $permission
     * @return JsonResponse
     */
    public function all(Permission $permission): JsonResponse
    {
        $permissions = $permission->getAll();

        return (new BasicResponse($permissions))
            ->response();
    }
}
