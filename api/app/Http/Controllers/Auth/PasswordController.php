<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Auth\UpdatePasswordRequest;
use App\Http\Requests\Auth\ForgotPasswordRequest;
use App\Http\Responses\BasicResponse;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\Auth\ResetPasswordRequest;
use App\Models\User;
use App\Services\User\Exception\UserException;
use App\Services\User\User as UserService;
use App\Services\Auth\Exception\AuthException;
use App\Services\Auth\ForgottenPassword;
use App\Services\Token\Exception\TokenException;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class LoginController
 */
class PasswordController extends Controller
{
    /**
     * Authenticate user
     * @param ForgotPasswordRequest $forgotPassword
     * @param ForgottenPassword $forgottenPassword
     * @return JsonResponse
     */
    public function forgot(ForgotPasswordRequest $forgotPassword, ForgottenPassword $forgottenPassword): JsonResponse
    {
        try {
            $forgottenPassword->init($forgotPassword->get('email'));

        } catch (TokenException | AuthException $e) {}

        return (new BasicResponse())
            ->setMessage('Instrukcije za promenu lozinke su poslate.')
            ->response();
    }

    /**
     * Reset password of a user
     * @param ResetPasswordRequest $resetPassword
     * @param ForgottenPassword $forgottenPassword
     * @return JsonResponse
     */
    public function reset(ResetPasswordRequest $resetPassword, ForgottenPassword $forgottenPassword): JsonResponse
    {
        try {
            $forgottenPassword->reset(
                $resetPassword->get('token'),
                $resetPassword->get('password')
            );

            return (new BasicResponse())
                ->setMessage('Uspešno ste resetovali lozinku.')
                ->response();
        } catch (TokenException $e) {

            return (new BasicResponse())
                ->setSuccess(false)
                ->setMessage($e->getMessage())
                ->response()
                ->setStatusCode(Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * Update password of a user with a confirmation
     * @param UpdatePasswordRequest $updatePassword
     * @param UserService $userService
     * @return JsonResponse
     */
    public function update(UpdatePasswordRequest $updatePassword, UserService $userService): JsonResponse
    {
        /**@var User $user */
        $user = Auth::user();

        try {
            $userService->updatePassword(
                $user,
                $updatePassword->get('password_current'),
                $updatePassword->get('password')
            );

            return (new BasicResponse($user))
                ->setMessage('Uspešno ste promenili lozinku.')
                ->response();
        } catch (UserException $e) {

            return (new BasicResponse())
                ->setSuccess(false)
                ->setMessage($e->getMessage())
                ->response()
                ->setStatusCode(Response::HTTP_BAD_REQUEST);
        }
    }
}
