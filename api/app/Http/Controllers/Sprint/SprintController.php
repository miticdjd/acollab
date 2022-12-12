<?php

namespace App\Http\Controllers\Sprint;

use App\Http\Responses\BasicResponse;
use App\Http\Responses\CollectionResponse;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Routing\Controller;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\Sprint\AddRequest;
use App\Http\Requests\Sprint\EditRequest;
use App\Services\Sprint\Sprint;
use App\Models\Sprint as SprintModel;
use Symfony\Component\HttpFoundation\Response;
use App\Services\Sorting\Sort;
use App\Services\Sorting\PerPage;
use Illuminate\Http\Request;

class SprintController extends Controller
{
    use AuthorizesRequests;

    /**
     * Get all sprints
     * @param Sprint $sprint
     * @return JsonResponse
     */
    public function all(Sprint $sprint): JsonResponse
    {
        $sprints = $sprint->getAll();

        return (new BasicResponse($sprints))
            ->response();
    }

    /**
     * Get all sprints
     * @param Sprint $sprint
     * @return JsonResponse
     */
    public function index(Sprint $sprint, Request $request): JsonResponse
    {
        $sort = new Sort($request);
        $perPage = new PerPage($request);
        $sprints = $sprint->getAllPaginated($sort, $perPage);

        return (new CollectionResponse($sprints))
            ->response();
    }

    /**
     * Get details of a sprint
     * @param SprintModel $sprint
     * @return JsonResponse
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function details(SprintModel $sprint)
    {
        $this->authorize('read', SprintModel::class);

        return (new BasicResponse($sprint))
            ->response();
    }

    /**
     * Add new sprint in database
     * @param AddRequest $request
     * @param Sprint $sprintService
     * @return JsonResponse
     */
    public function add(AddRequest $request, Sprint $sprintService): JsonResponse
    {
        $created = $sprintService->add($request->validated());

        return (new BasicResponse($created))
            ->setMessage('Novi sprint je kreiran.')
            ->response();
    }

    /**
     * Updated existing sprints
     * @param EditRequest $request
     * @param SprintModel $sprint
     * @param Sprint $sprintService
     * @return JsonResponse
     */
    public function edit(EditRequest $request, SprintModel $sprint, Sprint $sprintService): JsonResponse
    {
        $updated = $sprintService->update($sprint, $request->validated());

        return (new BasicResponse($updated->refresh()))
            ->setMessage('Sprint je uspešno promenjen.')
            ->response();
    }

    /**
     * Remove sprint
     * @param SprintModel $sprint
     * @param Sprint $sprintService
     * @return JsonResponse
     * @throws \Exception
     */
    public function remove(SprintModel $sprint, Sprint $sprintService): JsonResponse
    {
        if ($sprintService->remove($sprint)) {

            return (new BasicResponse())
                ->setMessage('Sprint je uspešno obrisan.')
                ->response();
        }

        return (new BasicResponse())
            ->response()
            ->setStatusCode(Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    /**
     * Finish sprint
     *
     * @param SprintModel $sprint
     * @param Sprint $sprintService
     * @return JsonResponse
     */
    public function finish(SprintModel $sprint, Sprint $sprintService): JsonResponse
    {
        $sprintService->finish($sprint);

        return (new BasicResponse())
                ->setMessage('Sprint je uspešno završen.')
                ->response();
    }
}
