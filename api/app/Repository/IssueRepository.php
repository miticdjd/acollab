<?php

namespace App\Repository;

use Illuminate\Pagination\LengthAwarePaginator;
use App\Models\Issue;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;

class IssueRepository
{
    /**
     * Get all issues
     * @param int $perPage
     * @return LengthAwarePaginator
     */
    public function getAllPaginated(string $column, string $direction, int $perPage): LengthAwarePaginator
    {
        return Issue::orderBy($column, $direction)->paginate($perPage);
    }

    /**
     * Get all paginated by projects
     *
     * @param array $projectIds
     * @param string $column
     * @param string $direction
     * @param integer $perPage
     * @return LengthAwarePaginator
     */
    public function getAllPaginatedByProjects(array $projectIds, string $column, string $direction, int $perPage): LengthAwarePaginator
    {
        return Issue::whereIn('project_id', $projectIds)->orderBy($column, $direction)->paginate($perPage);
    }

    /**
     * Filter all queries
     *
     * @param integer $perPage
     * @param array $fields
     * @param string $column
     * @param string $direction
     * @return LengthAwarePaginator
     */
    public function filterAll(int $perPage, array $fields, string $column, string $direction): LengthAwarePaginator
    {
        $query = Issue::query();

        if (array_key_exists('name', $fields) && !empty($fields['name'])) {
            $query->where(function($query) use ($fields) {
                $query->where('name', 'LIKE', '%' . $fields['name'] . '%');
                $query->orWhere('code', 'LIKE', '%' . $fields['name'] . '%');
            });
        }

        if (array_key_exists('project_id', $fields) && is_array($fields['project_id'])) {
            $query->whereIn('project_id', $fields['project_id']);
        }

        if (array_key_exists('issue_type_id', $fields) && is_array($fields['issue_type_id'])) {
            $query->whereIn('issue_type_id', $fields['issue_type_id']);
        }

        if (array_key_exists('status', $fields) && is_array($fields['status'])) {
            $query->whereIn('status', $fields['status']);
        }

        if (array_key_exists('user_id', $fields) && is_array($fields['user_id'])) {
            $query->whereIn('user_id', $fields['user_id']);
        }

        if (array_key_exists('event_type', $fields) && is_array($fields['event_type'])) {
            $query->whereIn('event_type', $fields['event_type']);
        }

        if (array_key_exists('created_at', $fields)) {
            $start = new Carbon($fields['created_at']['start'] . '00:00:00');
            $end = new Carbon($fields['created_at']['end'] . '23:59:59');

            $query->whereBetween('created_at', [$start, $end]);
        }

        return $query->orderBy($column, $direction)->paginate($perPage);
    }

    /**
     * Get all issues
     * @return Collection
     */
    public function getAll(): Collection
    {
        return Issue::all();
    }

    /**
     * Get all by projects
     *
     * @param array $projectIds
     * @return Collection
     */
    public function getAllByProjects(array $projectIds): Collection
    {

        return Issue::whereIn('project_id', $projectIds)->get();
    }

    /**
     * Count all by projects
     *
     * @param array $projectIds
     * @return int
     */
    public function countAllByProjects(array $projectIds): int
    {

        return Issue::whereIn('project_id', $projectIds)->count();
    }

    /**
     * Get issues by single project
     *
     * @param integer $projectId
     * @return Collection
     */
    public function getAllByProject(int $projectId): Collection
    {
        return Issue::where('project_id', $projectId)->get();
    }

    /**
     * Create new issue
     * @param array $fields
     * @return Issue
     */
    public function add(array $fields): Issue
    {
        $issue = new Issue();
        $issue->fill($fields);
        $issue->save();

        return $issue;
    }

    /**
     * Update issue
     *
     * @param Issue $issue
     * @param array $fields
     *
     * @return Issue
     */
    public function update(Issue $issue, array $fields): Issue
    {
        $issue->fill($fields);
        $issue->save();

        return $issue;
    }

    /**
     * Update status of a issue
     * @param Issue $issue
     * @param string $status
     * @return Issue
     */
    public function updateStatus(Issue $issue, string $status): Issue
    {
        $issue->status = $status;
        $issue->save();

        return $issue;
    }

    /**
     * Remove issue
     * @param Issue $issue
     * @return bool|null
     * @throws \Exception
     */
    public function remove(Issue $issue): ?bool
    {
        return $issue->delete();
    }
}
