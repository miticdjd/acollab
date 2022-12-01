<?php

namespace App\Services\Sprint;

use Illuminate\Pagination\LengthAwarePaginator;
use App\Models\Sprint as SprintModel;
use App\Repository\SprintRepository;
use App\Services\Sorting\Sort;
use App\Services\Sorting\PerPage;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Auth\Access\AuthorizationException;
use App\Services\Audit\Event;
use App\Services\Audit\EventTypes;
use Illuminate\Database\Eloquent\Collection;

class Sprint
{
    use AuthorizesRequests;

    /**
     * @var SprintRepository
     */
    private SprintRepository $sprintRepository;

    /**
     * Updated event service
     */
    private Event $eventService;

    /**
     * Columns that are sortable
     * @var array
     */
    public const COLUMNS_FOR_SORT = ['name', 'start', 'end'];

    /**
     * Sprint constructor.
     * @param SprintRepository $sprintRepository
     * @param Event $eventService
     */
    public function __construct(SprintRepository $sprintRepository, Event $eventService)
    {
        $this->sprintRepository = $sprintRepository;
        $this->eventService = $eventService;
    }

    /**
     * Get all sprints from database
     * @return LengthAwarePaginator
     * @throws AuthorizationException
     */
    public function getAllPaginated(Sort $sort, PerPage $perPage): LengthAwarePaginator
    {
        $this->authorize('read', SprintModel::class);

        $sort->setAdditionalColumns(self::COLUMNS_FOR_SORT);
        $column = $sort->getColumn();
        $direction = $sort->getDirection();
        $perPage = $perPage->getPerPage();

        return $this->sprintRepository->getAllPaginated($column, $direction, $perPage);
    }

    /**
     * Get all sprints from database
     * @return Collection
     * @throws AuthorizationException
     */
    public function getAll(): Collection
    {
        $this->authorize('read', SprintModel::class);

        return $this->sprintRepository->getAll();
    }

    /**
     * Add new sprint
     * @param array $fields
     * @return SprintModel
     * @throws AuthorizationException
     */
    public function add(array $fields): SprintModel
    {
        $this->authorize('write', SprintModel::class);

        $sprint = $this->sprintRepository->add($fields);

        if (isset($fields['issues'])) {
            $this->sprintRepository->attachIssues($sprint, $fields['issues']);
        }

        $this->eventService->add($sprint->id, SprintModel::class, EventTypes::ENTITY_CREATED, $fields);

        return $sprint;
    }

    /**
     * Save project data
     * @param SprintModel $sprint
     * @param array $data
     * @return SprintModel
     * @throws AuthorizationException
     */
    public function update(SprintModel $sprint, array $data): SprintModel
    {
        $this->authorize('write', SprintModel::class);

        $original = $sprint->getOriginal();

        $sprint = $this->sprintRepository->update($sprint, $data);

        if (isset($data['issues'])) {
            $this->sprintRepository->attachIssues($sprint, $data['issues']);
        }

        $changes = $sprint->getChanges();

        $data = [
            'changes' => $changes,
            'original' => $original,
        ];
        $this->eventService->add($sprint->id, SprintModel::class, EventTypes::ENTITY_UPDATED, $data);

        return $sprint;
    }

    /**
     * Remove sprint
     * @param SprintModel $sprintModel
     * @return bool
     * @throws \Exception
     */
    public function remove(SprintModel $sprint): bool
    {
        $this->authorize('delete', SprintModel::class);

        $original = $sprint->getOriginal();
        $sprintDeleted = $this->sprintRepository->remove($sprint);

        $changes = $sprint->getChanges();
        $data = [
            'changes' => $changes,
            'original' => $original,
        ];
        $this->eventService->add($sprint->id, SprintModel::class, EventTypes::ENTITY_DELETED, $data);

        return $sprintDeleted;
    }
}
