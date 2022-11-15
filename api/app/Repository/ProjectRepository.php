<?php

namespace App\Repository;

use Illuminate\Pagination\LengthAwarePaginator;
use App\Models\Project;
use App\Services\Project\UserType;
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
     * Get all projects
     * @return Collection
     */
    public function getAll(): Collection
    {
        return Project::all();
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
