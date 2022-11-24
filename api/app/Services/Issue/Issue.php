<?php

namespace App\Services\Issue;

use Illuminate\Pagination\LengthAwarePaginator;
use App\Models\Issue as IssueModel;
use App\Repository\IssueRepository;
use App\Services\Sorting\Sort;
use App\Services\Sorting\PerPage;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Auth\Access\AuthorizationException;
use App\Services\Audit\Event;
use App\Services\Audit\EventTypes;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;

class Issue
{
    use AuthorizesRequests;

    /**
     * @var IssueRepository
     */
    private IssueRepository $issueRepository;

    /**
     * Updated event service
     */
    private Event $eventService;

    /**
     * Columns that are sortable
     * @var array
     */
    public const COLUMNS_FOR_SORT = ['name', 'code', 'status', 'type_id'];

    /**
     * Issue constructor.
     * @param IssueRepository $issueRepository
     * @param Event $eventService
     */
    public function __construct(IssueRepository $issueRepository, Event $eventService)
    {
        $this->issueRepository = $issueRepository;
        $this->eventService = $eventService;
    }

    /**
     * Get all issues from database
     * @return LengthAwarePaginator
     * @throws AuthorizationException
     */
    public function getAllPaginated(Sort $sort, PerPage $perPage): LengthAwarePaginator
    {
        $this->authorize('read', IssueModel::class);

        $sort->setAdditionalColumns(self::COLUMNS_FOR_SORT);
        $column = $sort->getColumn();
        $direction = $sort->getDirection();
        $perPage = $perPage->getPerPage();

        return $this->issueRepository->getAllPaginated($column, $direction, $perPage);
    }

    /**
     * Get all issues from database
     * @return Collection
     * @throws AuthorizationException
     */
    public function getAll(): Collection
    {
        $this->authorize('read', IssueModel::class);

        return $this->issueRepository->getAll();
    }

    /**
     * Add new issue
     * @param array $fields
     * @return IssueModel
     * @throws AuthorizationException
     */
    public function add(array $fields): IssueModel
    {
        $this->authorize('write', IssueModel::class);

        $fields['status'] = Status::STATUS_OPEN;
        $issue = $this->issueRepository->add($fields);

        $this->eventService->add($issue->id, IssueModel::class, EventTypes::ENTITY_CREATED, $fields);

        return $issue;
    }

    /**
     * Save issue data
     * @param IssueModel $issue
     * @param array $data
     * @return IssueModel
     * @throws AuthorizationException
     */
    public function update(IssueModel $issue, array $data): IssueModel
    {
        $this->authorize('write', ProjectModel::class);

        $original = $issue->getOriginal();
        $issue = $this->issueRepository->update($issue, $data);
        $changes = $issue->getChanges();

        $data = [
            'changes' => $changes,
            'original' => $original,
        ];
        $this->eventService->add($issue->id, ProjectModel::class, EventTypes::ENTITY_UPDATED, $data);

        return $issue;
    }

    /**
     * Remove issue
     * @param IssueModel $issue
     * @return bool
     * @throws \Exception
     */
    public function remove(IssueModel $issue): bool
    {
        $this->authorize('delete', ProjectModel::class);

        $original = $issue->getOriginal();

        $issue = $this->issueRepository->updateStatus($issue, Status::STATUS_REMOVED);
        $issueDeleted = $this->issueRepository->remove($issue);

        $changes = $issue->getChanges();
        $data = [
            'changes' => $changes,
            'original' => $original,
        ];
        $this->eventService->add($issue->id, UserModel::class, EventTypes::ENTITY_DELETED, $data);

        return $issueDeleted;
    }
}