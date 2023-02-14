<?php

namespace App\Repository;

use Illuminate\Pagination\LengthAwarePaginator;
use App\Models\Project;
use App\Services\Project\UserType;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;

class ProjectRepository
{
    /**
     * Get all projects
     * @param int $perPage
     * @return LengthAwarePaginator
     */
    public function getAllPaginated(string $column, string $direction, int $perPage): LengthAwarePaginator
    {
        return Project::orderBy($column, $direction)->paginate($perPage);
    }

    /**
     * Get all paginated for developer
     *
     * @param integer $userId
     * @param string $column
     * @param string $direction
     * @param integer $perPage
     * @return LengthAwarePaginator
     */
    public function getAllPaginatedForDeveloper(int $userId, string $column, string $direction, int $perPage): LengthAwarePaginator
    {
        return Project::whereHas('developers', function(Builder $query) use ($userId) {
                $query->where('user_id', $userId);
            })
            ->orderBy($column, $direction)->paginate($perPage);
    }

    /**
     * Get all paginated for manager
     *
     * @param integer $userId
     * @param string $column
     * @param string $direction
     * @param integer $perPage
     * @return LengthAwarePaginator
     */
    public function getAllPaginatedForManager(int $userId, string $column, string $direction, int $perPage): LengthAwarePaginator
    {
        return Project::whereHas('managers', function(Builder $query) use ($userId) {
                $query->where('user_id', $userId);
            })
            ->orderBy($column, $direction)->paginate($perPage);
    }

    /**
     * Get all projects
     * @return Collection
     */
    public function getAll(): Collection
    {
        return Project::all();
    }

    /**
     * Count all projects
     *
     * @return int
     */
    public function countAll(): int
    {
        return Project::count();
    }

    /**
     * Get all for developer
     *
     * @param integer $userId
     * @return Collection
     */
    public function getAllForDeveloper(int $userId): Collection
    {
        return Project::whereHas('developers', function(Builder $query) use ($userId) {
            $query->where('user_id', $userId);
        })->get();
    }

    /**
     * Count all for developer
     *
     * @param integer $userId
     * @return integer
     */
    public function countAllForDeveloper(int $userId): int
    {
        return Project::whereHas('developers', function(Builder $query) use ($userId) {
            $query->where('user_id', $userId);
        })->count();
    }

    /**
     * Get all for manager
     *
     * @param integer $userId
     * @return Collection
     */
    public function getAllForManager(int $userId): Collection
    {
        return Project::whereHas('managers', function(Builder $query) use ($userId) {
            $query->where('user_id', $userId);
        })->get();
    }

    /**
     * Count all for manager
     *
     * @param integer $userId
     * @return int
     */
    public function countAllForManager(int $userId): int
    {
        return Project::whereHas('managers', function(Builder $query) use ($userId) {
            $query->where('user_id', $userId);
        })->count();
    }

    /**
     * Create new project
     * @param array $fields
     * @return Project
     */
    public function add(array $fields): Project
    {
        $project = new Project();
        $project->fill($fields);

        $project->save();

        return $project;
    }

    /**
     * Attach managers
     * @param Project $project
     * @param array $userIds
     * @return Project
     */
    public function attachManagers(Project $project, array $userIds): Project
    {
        $project->managers()->syncWithPivotValues($userIds, ['type' => UserType::TYPE_MANAGER]);

        return $project;
    }

    /**
     * Attach developers
     * @param Project $project
     * @param array $userIds
     * @return Project
     */
    public function attachDevelopers(Project $project, array $userIds): Project
    {
        $project->developers()->syncWithPivotValues($userIds, ['type' => UserType::TYPE_DEVELOPER]);

        return $project;
    }

    /**
     * Update project
     *
     * @param Project $project
     * @param array $fields
     *
     * @return Project
     */
    public function update(Project $project, array $fields): Project
    {
        $project->fill($fields);
        $project->save();

        return $project;
    }

    /**
     * Update status of a project
     * @param Project $project
     * @param string $status
     * @return Project
     */
    public function updateStatus(Project $project, string $status): Project
    {
        $project->status = $status;
        $project->save();

        return $project;
    }

    /**
     * Remove project
     * @param Project $project
     * @return bool|null
     * @throws \Exception
     */
    public function remove(Project $project): ?bool
    {
        return $project->delete();
    }
}
