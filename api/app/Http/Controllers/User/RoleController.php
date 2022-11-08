<?php

namespace App\Http\Controllers\User;

use App\Http\Responses\BasicResponse;
use App\Http\Responses\CollectionResponse;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Routing\Controller;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\Role\AddRequest;
use App\Http\Requests\Role\EditRequest;
use App\Services\User\Exception\RoleException;
use App\Services\User\Role;
use App\Models\Role as RoleModel;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Services\Sorting\Sort;
use App\Services\Sorting\PerPage;
use Illuminate\Auth\Access\AuthorizationException;


class RoleController extends Controller
{
    use AuthorizesRequests;

    /**
     * Get all roles
     * @param Role $role
     * @return JsonResponse
     */
    public function all(Role $role): JsonResponse
    {
        $roles = $role->getAll();

        return (new BasicResponse($roles))
            ->response();
    }

    /**
     * Get all roles
     * @param Role $role
     * @return JsonResponse
     */
    public function index(Role $role, Request $request): JsonResponse
    {
        $sort = new Sort($request);
        $perPage = new PerPage($request);
        $roles = $role->getAllPaginated($sort, $perPage);



        return (new CollectionResponse($roles))
            ->response();
    }

    /**
     * Get details of a role
     * @param RoleModel $role
     * @return JsonResponse
     * @throws AuthorizationException
     */
    public function details(RoleModel $role)
    {
        $this->authorize('read', RoleModel::class);

        $role->load('permissions');

        return (new BasicResponse($role))
            ->response();
    }

    /**
     * Add new role in database
     * @param AddRequest $request
     * @param Role $roleService
     * @return JsonResponse
     */
    public function add(AddRequest $request, Role $roleService): JsonResponse
    {
        $created = $roleService->add($request->validated());

        return (new BasicResponse($created))
            ->setMessage(__('label.role.created'))
            ->response();
    }

    /**
     * Updated existing role
     * @param EditRequest $request
     * @param RoleModel $role
     * @param Role $roleService
     * @return JsonResponse
     */
    public function edit(EditRequest $request, RoleModel $role, Role $roleService): JsonResponse
    {
        try {
            $updated = $roleService->update($role, $request->validated());

            return (new BasicResponse($updated))
                ->setMessage(__('label.role.updated'))
                ->response();
        } catch (RoleException $e) {

            return (new BasicResponse())
                ->setSuccess(false)
                ->setMessage($e->getMessage())
                ->response()
                ->setStatusCode(Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * Get role service
     * @param RoleModel $role
     * @param Role $roleService
     * @return JsonResponse
     * @throws \Exception
     */
    public function remove(RoleModel $role, Role $roleService): JsonResponse
    {
        try {
            if ($roleService->remove($role)) {

                return (new BasicResponse())
                    ->setMessage(__('label.role.deleted'))
                    ->response();
            }

            return (new BasicResponse())
                ->response()
                ->setStatusCode(Response::HTTP_UNPROCESSABLE_ENTITY);
        } catch (RoleException $e) {

            return (new BasicResponse())
                ->setSuccess(false)
                ->setMessage($e->getMessage())
                ->response()
                ->setStatusCode(Response::HTTP_BAD_REQUEST);
        }
    }
}
