<?php

namespace App\Http\Controllers\Auth;

use App\Http\Requests\Auth\ProfileRequest;
use App\Http\Responses\BasicResponse;
use App\Models\User;
use App\Services\User\User as UserService;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Http\Controllers\Controller;
use App\Services\User\Role;
use Spatie\Permission\Models\Permission;

class ProfileController extends Controller
{
    /**
     * Display profile of a logged in user
     * @return JsonResponse
     */
    public function who(): JsonResponse
    {
        /** @var User $user */
        $user = Auth::user();

        return (new BasicResponse([
            'user' => $user,
            'permissions' =>
                    $user->hasRole(Role::ROLE_SUPER_ADMIN)
                        ? Permission::all()->pluck('name')
                        : $user->getAllPermissions()->pluck('name'),
        ]))
            ->response();
    }

    /**
     * Updated current user data
     * @param ProfileRequest $request
     * @param UserService $userService
     * @return JsonResponse
     */
    public function update(ProfileRequest $request, UserService $userService): JsonResponse
    {
        /** @var User $user */
        $user = Auth::user();
        $updated = $userService->update($user, $request->validated());

        return (new BasicResponse($updated))
            ->setMessage(__('label.profile.updated'))
            ->response();
    }
}
