<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Responses\BasicResponse;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use App\Services\Audit\Event;
use App\Services\Audit\EventTypes;

/**
 * Class LoginController
 */
class LogoutController extends Controller
{
    /**
     * Logout user from system
     * @param Request $request
     * @return JsonResponse
     */
    public function logout(Request $request, Event $eventService): JsonResponse
    {
        /** @var User $user */
        $user = $request->user();
        $user->token()->revoke();

        $eventService->addForSpecificUser($user->id, $user->id, User::class, EventTypes::USER_LOGOUT, ['user_id' => $user->id]);

        return (new BasicResponse())
            ->setMessage('Uspešno ste se izlogovali.')
            ->response();
    }
}
