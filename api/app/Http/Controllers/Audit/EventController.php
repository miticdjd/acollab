<?php

namespace App\Http\Controllers\Audit;

use App\Http\Responses\BasicResponse;
use App\Http\Responses\CollectionResponse;
use App\Models\AuditEvent;
use App\Services\Audit\EventTypes;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use App\Http\Requests\Audit\Filter;
use App\Services\Audit\Event;
use App\Services\Sorting\PerPage;
use App\Services\Sorting\Sort;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class EventController extends Controller
{
    use AuthorizesRequests;

    /**
     * @param Event $eventService
     * @return JsonResponse
     * @throws AuthorizationException
     */
    public function list(Event $eventService, Request $request): JsonResponse
    {
        $this->authorize('read', AuditEvent::class);

        $sort = new Sort($request);
        $perPage = new PerPage($request);
        $list = $eventService->getAllPaginated($sort, $perPage);

        return (new CollectionResponse($list))->response();
    }

    /**
     * Filter all audit events
     *
     * @param Event $eventService
     * @param Filter $request
     * @return JsonResponse
     * @throws AuthorizationException
     */
    public function filter(Event $eventService, Filter $request): JsonResponse
    {
        $this->authorize('read', AuditEvent::class);

        $sort = new Sort($request);
        $perPage = new PerPage($request);
        $list = $eventService->filterAll($sort, $perPage, $request->validated());

        return (new CollectionResponse($list))->response();
    }

    /**
     * @param string $eventId
     * @param Event $eventService
     * @return JsonResponse
     * @throws AuthorizationException
     */
    public function details(string $eventId, Event $eventService): JsonResponse
    {
        $this->authorize('read', AuditEvent::class);

        $audit = $eventService->details($eventId);

        return (new BasicResponse($audit))
            ->response();
    }

    /**
     * @param EventTypes $eventTypes
     * @return JsonResponse
     * @throws AuthorizationException
     */
    public function getAllEventTypes(EventTypes $eventTypes): JsonResponse
    {
        $this->authorize('read', AuditEvent::class);

        $audit = $eventTypes->getAllEvents();

        return (new BasicResponse($audit))
            ->response();
    }
}
