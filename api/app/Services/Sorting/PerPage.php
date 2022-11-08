<?php

namespace App\Services\Sorting;

use Illuminate\Http\Request;

class PerPage
{
    /**
     * Selected per page
     * @var array
     */
    private $perPage = 10;

    /**
     * Default per page
     * @var string
     */
    private $defaultPerPage = 10;

    /**
     * Request that is using
     * @var Request
     */
    private $request;

    /**
     * Sort constructor.
     * @param Request $request
     * @param int $defaultPerPage
     */
    public function __construct(Request $request, int $defaultPerPage = 5)
    {
        $this->request = $request;
        $this->defaultPerPage = $defaultPerPage;
    }

    /**
     * Get per page
     * @return integer
     */
    public function getPerPage(): int
    {
        $perPage = $this->request->query('per_page');
        if (!empty($perPage)) {
            $this->perPage = $perPage;
        }

        if ($this->perPage && $this->perPage > 0) {
            return $this->perPage;
        }

        return $this->defaultPerPage;
    }
}
