<?php

namespace App\Services\Project;

use Illuminate\Pagination\LengthAwarePaginator;
use App\Models\Project as ProjectModel;
use App\Repository\ProjectRepository;
use App\Services\Sorting\Sort;
use App\Services\Sorting\PerPage;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Auth\Access\AuthorizationException;
use App\Services\Audit\Event;
use App\Services\Audit\EventTypes;
use App\Services\User\Role;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;

class Project
{
    use AuthorizesRequests;

    /**
     * @var ProjectRepository
     */
    private ProjectRepository $projectRepository;

    /**
     * Updated event service
     */
    private Event $eventService;

    /**
     * Columns that are sortable
     * @var array
     */
    public const COLUMNS_FOR_SORT = ['name', 'code', 'status'];

    private string $avatarFolder = 'avatars';

    /**
     * Project constructor.
     * @param ProjectRepository $projectRepository
     * @param Event $eventService
     */
    public function __construct(ProjectRepository $projectRepository, Event $eventService)
    {
        $this->projectRepository = $projectRepository;
        $this->eventService = $eventService;
    }

    /**
     * Get all projects from database
     * @return LengthAwarePaginator
     * @throws AuthorizationException
     */
    public function getAllPaginated(Sort $sort, PerPage $perPage): LengthAwarePaginator
    {
        $this->authorize('read', ProjectModel::class);

        $sort->setAdditionalColumns(self::COLUMNS_FOR_SORT);
        $column = $sort->getColumn();
        $direction = $sort->getDirection();
        $perPage = $perPage->getPerPage();

        $user = Auth::user();
        if ($user->hasRole(Role::ROLE_DEVELOPER)) {

            return $this->projectRepository->getAllPaginatedForDeveloper($user->id, $column, $direction, $perPage);
        }

        if ($user->hasRole(Role::ROLE_MANAGER)) {

            return $this->projectRepository->getAllPaginatedForManager($user->id, $column, $direction, $perPage);
        }

        return $this->projectRepository->getAllPaginated($column, $direction, $perPage);
    }

    /**
     * Get all projects from database
     * @return Collection
     * @throws AuthorizationException
     */
    public function getAll(): Collection
    {
        $this->authorize('read', ProjectModel::class);

        $user = Auth::user();
        if ($user->hasRole(Role::ROLE_DEVELOPER)) {

            return $this->projectRepository->getAllForDeveloper($user->id);
        }

        if ($user->hasRole(Role::ROLE_MANAGER)) {

            return $this->projectRepository->getAllForManager($user->id);
        }

        return $this->projectRepository->getAll();
    }

    /**
     * Add new project
     * @param array $fields
     * @return ProjectModel
     * @throws AuthorizationException
     */
    public function add(array $fields): ProjectModel
    {
        $this->authorize('write', ProjectModel::class);

        $fields['status'] = Status::STATUS_ACTIVE;
        $project = $this->projectRepository->add($fields);

        $user = Auth::user();
        if ($user->hasRole(Role::ROLE_ADMINISTRATOR) && isset($fields['managers']) && is_array($fields['managers'])) {
            $this->projectRepository->attachManagers($project, $fields['managers']);
        }

        if ($user->hasRole(Role::ROLE_MANAGER)) {
            $this->projectRepository->attachManagers($project, [$user->id]);
        }

        if (isset($fields['developers']) && is_array($fields['developers'])) {
            $this->projectRepository->attachDevelopers($project, $fields['developers']);
        }

        $this->eventService->add($project->id, ProjectModel::class, EventTypes::ENTITY_CREATED, $fields);

        return $project;
    }

    /**
     * Save project data
     * @param ProjectModel $project
     * @param array $data
     * @return ProjectModel
     * @throws AuthorizationException
     */
    public function update(ProjectModel $project, array $data): ProjectModel
    {
        $this->authorize('write', ProjectModel::class);

        $original = $project->getOriginal();

        $project = $this->projectRepository->update($project, $data);

        $user = Auth::user();
        if ($user->hasRole(Role::ROLE_ADMINISTRATOR) && isset($data['managers']) && is_array($data['managers'])) {
            $this->projectRepository->attachManagers($project, $data['managers']);
        }

        if (isset($data['developers']) && is_array($data['developers'])) {
            $this->projectRepository->attachDevelopers($project, $data['developers']);
        }

        $changes = $project->getChanges();

        $data = [
            'changes' => $changes,
            'original' => $original,
        ];
        $this->eventService->add($project->id, ProjectModel::class, EventTypes::ENTITY_UPDATED, $data);

        return $project;
    }

    /**
     * Remove project
     * @param ProjectModel $project
     * @return bool
     * @throws \Exception
     */
    public function remove(ProjectModel $project): bool
    {
        $this->authorize('delete', ProjectModel::class);

        $original = $project->getOriginal();

        $project = $this->projectRepository->updateStatus($project, Status::STATUS_REMOVED);
        $projectDeleted = $this->projectRepository->remove($project);

        $changes = $project->getChanges();
        $data = [
            'changes' => $changes,
            'original' => $original,
        ];
        $this->eventService->add($project->id, UserModel::class, EventTypes::ENTITY_DELETED, $data);

        return $projectDeleted;
    }
}
