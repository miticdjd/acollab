<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Responses\BasicResponse;
use App\Services\Auth\Authenticate;
use App\Services\Auth\Exception\AuthException;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use App\Services\User\Role;
use Spatie\Permission\Models\Permission;

/**
 * Class LoginController
 */
class LoginController extends Controller
{
    /**
     * Authenticate user
     * @param LoginRequest $credentials
     * @param Authenticate $authenticate
     * @return JsonResponse
     */
    public function authenticate(LoginRequest $credentials, Authenticate $authenticate): JsonResponse
    {
        try {
            /** @var $user User */
            $user = $authenticate->attempt(
                $credentials->get('email'),
                $credentials->get('password')
            );
            $token = $authenticate->createAccessToken($user);

            return (new BasicResponse([
                'token' => $token->accessToken,
                'user' => $user,
                'roles' => $user->roles()->get()->pluck('name')
            ]))
                ->setMessage('Dobrodošli nazad.')
                ->response();
        } catch (AuthException $e) {

            return (new BasicResponse())
                ->setSuccess(false)
                ->setMessage('Vaše korisničko ime ili lozinka su pogrešno. Molimo Vas da pokušate ponovo.')
                ->response()
                ->setStatusCode(Response::HTTP_BAD_REQUEST);
        }
    }
}
