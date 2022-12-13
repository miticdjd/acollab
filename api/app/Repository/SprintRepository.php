<?php

namespace App\Repository;

use Illuminate\Pagination\LengthAwarePaginator;
use App\Models\Sprint;
use Illuminate\Database\Eloquent\Collection;

class SprintRepository
{
    /**
     * Get all sprints
     * @param int $perPage
     * @return LengthAwarePaginator
     */
    public function getAllPaginated(string $column, string $direction, int $perPage): LengthAwarePaginator
    {
        return Sprint::orderBy($column, $direction)->paginate($perPage);
    }

    /**
     * Get all sprints
     * @return Collection
     */
    public function getAll(): Collection
    {
        return Sprint::all();
    }

    /**
     * Count all sprints
     *
     * @return integer
     */
    public function countAll(): int
    {
        return Sprint::count();
    }

    /**
     * Create new sprint
     * @param array $fields
     * @return Sprint
     */
    public function add(array $fields): Sprint
    {
        $sprint = new Sprint();
        $sprint->fill($fields);

        $sprint->save();

        return $sprint;
    }

    /**
     * Attach issues
     * @param Sprint $sprint
     * @param array $issueIds
     * @return Sprint
     */
    public function attachIssues(Sprint $sprint, array $issueIds): Sprint
    {
        $sprint->issues()->sync($issueIds);

        return $sprint;
    }

    /**
     * Update sprint
     *
     * @param Sprint $sprint
     * @param array $fields
     *
     * @return Sprint
     */
    public function update(Sprint $sprint, array $fields): Sprint
    {
        $sprint->fill($fields);
        $sprint->save();

        return $sprint;
    }

    /**
     * Remove sprint
     * @param Sprint $sprint
     * @return bool|null
     * @throws \Exception
     */
    public function remove(Sprint $sprint): ?bool
    {
        return $sprint->delete();
    }
}
