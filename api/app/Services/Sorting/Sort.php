<?php

namespace App\Services\Sorting;

use Illuminate\Http\Request;

class Sort
{
    /**
     * Columns available for sorting
     * @var array
     */
    private $columns = [];

    /**
     * Default column for sorting
     * @var string
     */
    private $defaultColumn = 'id';

    /**
     * Selected column
     * @var string
     */
    private $column = null;

    /**
     * Available directions for sorting
     * @var array
     */
    private $directions = ['ASC', 'DESC'];

    /**
     * Selected direction for sorting
     * @var string
     */
    private $direction = null;

    /**
     * Default direction for sorting
     * @var string
     */
    private $defaultDirection = 'DESC';

    /**
     * Request that is using
     * @var Request
     */
    private $request;

    /**
     * Sort constructor.
     * @param Request $request
     * @param array $columns
     * @param string $defaultColumn
     * @param string $defaultDirection
     */
    public function __construct(Request $request, $columns = ['id'], $defaultColumn = 'id', $defaultDirection = 'DESC')
    {
        $this->request = $request;
        $this->columns = $columns;
        $this->defaultColumn = $defaultColumn;
        $this->defaultDirection = $defaultDirection;
    }

    /**
     * Get direction for sorting
     * @return string
     */
    public function getDirection(): string
    {
        $direction = $this->request->query('direction');
        if (!empty($direction)) {
            $this->direction = strtoupper($direction);
        }

        if ($this->direction && in_array($this->direction, $this->directions)) {
            return $this->direction;
        }

        return $this->defaultDirection;
    }

    /**
     * Get column for sorting
     * @return string
     */
    public function getColumn(): string
    {
        $sort = $this->request->query('sort');
        if (!empty($sort)) {
            $this->column = $sort;
        }

        if ($this->column && in_array($this->column, $this->columns)) {
            return $this->column;
        }

        return $this->defaultColumn;
    }

    /**
     * Set additional columns
     * @param array $columns
     */
    public function setAdditionalColumns(array $columns): void
    {
        $this->columns = array_merge($this->columns, $columns);
    }
}
