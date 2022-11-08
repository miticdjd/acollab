<?php

namespace App\Http\Controllers\User;

use App\Http\Responses\BasicResponse;
use App\Http\Responses\CollectionResponse;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Routing\Controller;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\User\AddRequest;
use App\Http\Requests\User\EditRequest;
use App\Services\User\User;
use App\Models\User as UserModel;
use Symfony\Component\HttpFoundation\Response;
use App\Services\Sorting\Sort;
use App\Services\Sorting\PerPage;
use Illuminate\Http\Request;

class UserController extends Controller
{
    use AuthorizesRequests;

    /**
     * Get all roles
     * @param User $user
     * @return JsonResponse
     */
    public function all(User $user): JsonResponse
    {
        $users = $user->getAll();

        return (new BasicResponse($users))
            ->response();
    }

    /**
     * Get all users
     * @param User $user
     * @return JsonResponse
     */
    public function index(User $user, Request $request): JsonResponse
    {
        $sort = new Sort($request);
        $perPage = new PerPage($request);
        $users = $user->getAllPaginated($sort, $perPage);

        return (new CollectionResponse($users))
            ->response();
    }

    /**
     * Get details of a user
     * @param UserModel $user
     * @return JsonResponse
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function details(UserModel $user)
    {
        $this->authorize('read', UserModel::class);

        $user->load('roles');
        $user->makeVisible('roles');

        return (new BasicResponse($user))
            ->response();
    }

    /**
     * Add new user in database
     * @param AddRequest $request
     * @param User $userService
     * @return JsonResponse
     */
    public function add(AddRequest $request, User $userService): JsonResponse
    {
        $created = $userService->add($request->validated());

        return (new BasicResponse($created->load('address', 'departments', 'teams', 'position')))
            ->setMessage(__('label.user.created'))
            ->response();
    }

    /**
     * Updated existing user
     * @param EditRequest $request
     * @param UserModel $user
     * @param User $userService
     * @return JsonResponse
     */
    public function edit(EditRequest $request, UserModel $user, User $userService): JsonResponse
    {
        $updated = $userService->update($user, $request->validated());

        return (new BasicResponse($updated->refresh()))
            ->setMessage(__('label.user.updated'))
            ->response();
    }

    /**
     * Get user service
     * @param UserModel $user
     * @param User $userService
     * @return JsonResponse
     * @throws \Exception
     */
    public function remove(UserModel $user, User $userService): JsonResponse
    {
        if ($userService->remove($user)) {

            return (new BasicResponse())
                ->setMessage(__('label.user.deleted'))
                ->response();
        }

        return (new BasicResponse())
            ->response()
            ->setStatusCode(Response::HTTP_UNPROCESSABLE_ENTITY);
    }
}
