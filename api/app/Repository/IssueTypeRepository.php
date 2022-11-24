<?php

namespace App\Repository;

use App\Models\IssueType;
use Illuminate\Database\Eloquent\Collection;

class IssueTypeRepository
{
    /**
     * Get all issue types
     * @return Collection
     */
    public function getAll(): Collection
    {
        return IssueType::all();
    }
}
