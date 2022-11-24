<?php

namespace App\Repository;

use Illuminate\Pagination\LengthAwarePaginator;
use App\Models\Issue;
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
     * Get all issues
     * @return Collection
     */
    public function getAll(): Collection
    {
        return Issue::all();
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
