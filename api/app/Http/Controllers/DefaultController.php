<?php

namespace App\Http\Controllers;

use App\Http\Responses\BasicResponse;
use App\Services\Issue\Issue;
use App\Services\Project\Project;
use App\Services\Sprint\Sprint;
use Illuminate\Http\JsonResponse;

class DefaultController extends Controller
{
    /**
     * Display welcome message
     * @return JsonResponse
     */
    public function welcome(): JsonResponse
    {
        return (new BasicResponse(['Dobrodošli na ACollab API.']))
            ->response();
    }

    /**
     * Statistics
     *
     * @return JsonResponse
     */
    public function statistics(Project $project, Issue $issue, Sprint $sprint): JsonResponse
    {
        $projects = $project->count();
        $issues = $issue->countAll();
        $sprints = $sprint->countAll();

        return (new BasicResponse([
            'projects' => $projects,
            'issues' => $issues,
            'sprints' => $sprints
            ]))->response();
    }
}
