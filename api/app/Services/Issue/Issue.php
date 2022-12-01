<?php

namespace App\Services\Issue;

use Illuminate\Pagination\LengthAwarePaginator;
use App\Models\Issue as IssueModel;
use App\Models\IssueAttachment;
use App\Repository\IssueRepository;
use App\Services\Sorting\Sort;
use App\Services\Sorting\PerPage;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Auth\Access\AuthorizationException;
use App\Services\Audit\Event;
use App\Services\Audit\EventTypes;
use Illuminate\Database\Eloquent\Collection;

class Issue
{
    use AuthorizesRequests;

    /**
     * @var IssueRepository
     */
    private IssueRepository $issueRepository;

    /**
     * Attachment
     *
     * @var Attachment
     */
    private Attachment $attachment;

    /**
     * Updated event service
     */
    private Event $eventService;

    /**
     * Columns that are sortable
     * @var array
     */
    public const COLUMNS_FOR_SORT = ['name', 'status', 'issue_type_id', 'project_id'];

    /**
     * Issue constructor.
     * @param IssueRepository $issueRepository
     * @param Event $eventService
     */
    public function __construct(IssueRepository $issueRepository, Attachment $attachment, Event $eventService)
    {
        $this->issueRepository = $issueRepository;
        $this->attachment = $attachment;
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
     * Filter all request regarding the issues
     *
     * @param Sort $sort
     * @param array $fields
     * @return LengthAwarePaginator
     */
    public function filterAll(Sort $sort, PerPage $perPage, array $fields): LengthAwarePaginator
    {
        $this->authorize('read', IssueModel::class);

        $sort->setAdditionalColumns(self::COLUMNS_FOR_SORT);
        $column = $sort->getColumn();
        $direction = $sort->getDirection();
        $perPage = $perPage->getPerPage();

        return $this->issueRepository->filterAll($perPage, $fields, $column, $direction);
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

        if (isset($fields['attachments'])) {
            foreach ($fields['attachments'] as $data) {
                $attachment = $this->attachment->add($issue->id, $data);
                $data['file'] = $attachment->file;
                $this->eventService->add($attachment->id, IssueAttachment::class, EventTypes::ENTITY_CREATED, $data);
            }
        }

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

        if (isset($data['attachments'])) {
            foreach ($data['attachments'] as $file) {
                $attachment = $this->attachment->add($issue->id, $file);
                $file['file'] = $attachment->file;
                $this->eventService->add($attachment->id, IssueAttachment::class, EventTypes::ENTITY_CREATED, $file);
            }
        }

        $data = [
            'changes' => $changes,
            'original' => $original,
        ];
        $this->eventService->add($issue->id, ProjectModel::class, EventTypes::ENTITY_UPDATED, $data);

        return $issue;
    }

    /**
     * Update status of issue
     *
     * @param IssueModel $issue
     * @param string $status
     * @return IssueModel
     */
    public function updateStatus(IssueModel $issue, string $status): IssueModel
    {
        $original = $issue->getOriginal();
        $issue = $this->issueRepository->updateStatus($issue, $status);
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
