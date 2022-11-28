<?php

namespace App\Http\Controllers\Issue;

use App\Http\Responses\BasicResponse;
use Illuminate\Routing\Controller;
use Illuminate\Http\JsonResponse;
use App\Services\Issue\Status;

class IssueStatusController extends Controller
{
    /**
     * Get all issue types
     * @param Status $status
     * @return JsonResponse
     */
    public function all(Status $status): JsonResponse
    {
        $statuses = $status->all();

        return (new BasicResponse($statuses))
            ->response();
    }
}
