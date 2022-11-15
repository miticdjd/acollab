<?php

namespace App\Http\Controllers\Project;

use App\Http\Responses\BasicResponse;
use App\Http\Responses\CollectionResponse;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Routing\Controller;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\Project\AddRequest;
use App\Http\Requests\Project\EditRequest;
use App\Services\Project\Project;
use App\Models\Project as ProjectModel;
use Symfony\Component\HttpFoundation\Response;
use App\Services\Sorting\Sort;
use App\Services\Sorting\PerPage;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    use AuthorizesRequests;

    /**
     * Get all projects
     * @param Project $project
     * @return JsonResponse
     */
    public function all(Project $project): JsonResponse
    {
        $projects = $project->getAll();

        return (new BasicResponse($projects))
            ->response();
    }

    /**
     * Get all projects
     * @param Project $project
     * @return JsonResponse
     */
    public function index(Project $project, Request $request): JsonResponse
    {
        $sort = new Sort($request);
        $perPage = new PerPage($request);
        $projects = $project->getAllPaginated($sort, $perPage);

        return (new CollectionResponse($projects))
            ->response();
    }

    /**
     * Get details of a project
     * @param ProjectModel $project
     * @return JsonResponse
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function details(ProjectModel $project)
    {
        $this->authorize('read', ProjectModel::class);

        return (new BasicResponse($project))
            ->response();
    }

    /**
     * Add new project in database
     * @param AddRequest $request
     * @param Project $projectService
     * @return JsonResponse
     */
    public function add(AddRequest $request, Project $projectService): JsonResponse
    {
        $created = $projectService->add($request->validated());

        return (new BasicResponse($created))
            ->setMessage('Novi projekat je kreiran.')
            ->response();
    }

    /**
     * Updated existing project
     * @param EditRequest $request
     * @param ProjectModel $project
     * @param Project $projectService
     * @return JsonResponse
     */
    public function edit(EditRequest $request, ProjectModel $project, Project $projectService): JsonResponse
    {
        $updated = $projectService->update($project, $request->validated());

        return (new BasicResponse($updated->refresh()))
            ->setMessage('Projekat je uspešno promenjen.')
            ->response();
    }

    /**
     * Remove project
     * @param ProjectModel $project
     * @param Project $projectService
     * @return JsonResponse
     * @throws \Exception
     */
    public function remove(ProjectModel $project, Project $projectService): JsonResponse
    {
        if ($projectService->remove($project)) {

            return (new BasicResponse())
                ->setMessage('Projekat je uspešno obrisan.')
                ->response();
        }

        return (new BasicResponse())
            ->response()
            ->setStatusCode(Response::HTTP_UNPROCESSABLE_ENTITY);
    }
}
