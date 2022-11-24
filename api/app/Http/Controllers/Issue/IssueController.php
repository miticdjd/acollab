<?php

namespace App\Http\Controllers\Issue;

use App\Http\Responses\BasicResponse;
use App\Http\Responses\CollectionResponse;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Routing\Controller;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\Issue\AddRequest;
use App\Http\Requests\Issue\EditRequest;
use App\Http\Requests\Issue\EditStatusRequest;
use App\Services\Issue\Issue;
use App\Models\Issue as IssueModel;
use Symfony\Component\HttpFoundation\Response;
use App\Services\Sorting\Sort;
use App\Services\Sorting\PerPage;
use Illuminate\Http\Request;

class IssueController extends Controller
{
    use AuthorizesRequests;

    /**
     * Get all issue
     * @param Issue $issue
     * @return JsonResponse
     */
    public function all(Issue $issue): JsonResponse
    {
        $issues = $issue->getAll();

        return (new BasicResponse($issues))
            ->response();
    }

    /**
     * Get all issue
     * @param Issue $issue
     * @return JsonResponse
     */
    public function index(Issue $issue, Request $request): JsonResponse
    {
        $sort = new Sort($request);
        $perPage = new PerPage($request);
        $issues = $issue->getAllPaginated($sort, $perPage);

        return (new CollectionResponse($issues))
            ->response();
    }

    /**
     * Get details of a issue
     * @param IssueModel $issue
     * @return JsonResponse
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function details(IssueModel $issue)
    {
        $this->authorize('read', IssueModel::class);

        return (new BasicResponse($issue))
            ->response();
    }

    /**
     * Add new issue in database
     * @param AddRequest $request
     * @param Issue $issueService
     * @return JsonResponse
     */
    public function add(AddRequest $request, Issue $issueService): JsonResponse
    {
        $created = $issueService->add($request->validated());

        return (new BasicResponse($created))
            ->setMessage('Novi task je kreiran.')
            ->response();
    }

    /**
     * Updated existing issue
     * @param EditRequest $request
     * @param IssueModel $issue
     * @param Issue $issueService
     * @return JsonResponse
     */
    public function edit(EditRequest $request, IssueModel $issue, Issue $issueService): JsonResponse
    {
        $updated = $issueService->update($issue, $request->validated());

        return (new BasicResponse($updated->refresh()))
            ->setMessage('Task je uspešno promenjen.')
            ->response();
    }

    /**
     * Update task status
     *
     * @param EditStatusRequest $request
     * @param IssueModel $issue
     * @param Issue $issueService
     * @return JsonResponse
     */
    public function editStatus(EditStatusRequest $request, IssueModel $issue, Issue $issueService): JsonResponse
    {
        $updated = $issueService->updateStatus($issue, $request->get('status'));

        return (new BasicResponse($updated->refresh()))
            ->setMessage('Status taska je uspešno promenjen.')
            ->response();
    }

    /**
     * Remove issue
     * @param IssueModel $issue
     * @param Issue $issueService
     * @return JsonResponse
     * @throws \Exception
     */
    public function remove(IssueModel $issue, Issue $issueService): JsonResponse
    {
        if ($issueService->remove($issue)) {

            return (new BasicResponse())
                ->setMessage('Task je uspešno obrisan.')
                ->response();
        }

        return (new BasicResponse())
            ->response()
            ->setStatusCode(Response::HTTP_UNPROCESSABLE_ENTITY);
    }
}
