<?php

namespace App\Http\Controllers\Issue;

use App\Http\Responses\BasicResponse;
use App\Services\Issue\IssueType;
use Illuminate\Routing\Controller;
use Illuminate\Http\JsonResponse;

class IssueTypeController extends Controller
{
    /**
     * Get all issue types
     * @param IssueType $issueType
     * @return JsonResponse
     */
    public function all(IssueType $issueType): JsonResponse
    {
        $types = $issueType->getAll();

        return (new BasicResponse($types))
            ->response();
    }
}
