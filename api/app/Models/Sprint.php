<?php

namespace App\Models;

use App\Services\Issue\Status;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class Sprint extends Model
{
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'project_id',
        'name',
        'objective',
        'start',
        'end'
    ];

    /**
     * @var array
     */
    protected $visible = [
        'id',
        'name',
        'objective',
        'start',
        'end',
        'project',
        'issues',
        'statistics'
    ];

    /**
     * Append virtual field
     *
     * @var array
     */
    protected $appends = ['statistics'];

    /**
     * Always load this relationships
     */
    protected $with = [
        'project',
        'issues'
    ];

    /**
     * Get statistics fields
     *
     * @return void
     */
    public function getStatisticsAttribute()
    {
        $doneIssues = $this->issues->where('status', Status::STATUS_DONE)->count();
        $inProgressIssues = $this->issues->where('status',  '!=', Status::STATUS_DONE)->count();

        return [ 'done' => $doneIssues, 'in_progress' => $inProgressIssues ];
    }

    /**
     * Project relation
     *
     * @return void
     */
    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    /**
     * Issues related to this sprint
     *
     * @return BelongsToMany
     */
    public function issues()
    {
        return $this->belongsToMany(Issue::class);
    }
}
