<?php

namespace App\Services\Issue;

use App\Repository\IssueTypeRepository;
use Illuminate\Support\Collection;

class IssueType
{
    /**
     * Issue type repository
     *
     * @var IssueTypeRepository
     */
    private IssueTypeRepository $issueTypeRepository;

    /**
     * Issue type of user type repository
     *
     * @param IssueTypeRepository $issueTypeRepository
     */
    public function __construct(IssueTypeRepository $issueTypeRepository)
    {
        $this->issueTypeRepository = $issueTypeRepository;
    }

    /**
     * Get all issue types
     * @return Collection
     * @throws AuthorizationException
     */
    public function getAll(): Collection
    {
        return $this->issueTypeRepository->getAll();
    }
}
