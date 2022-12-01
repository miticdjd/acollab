<?php

namespace App\Models;

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
        'issues'
    ];

    /**
     * Always load this relationships
     */
    protected $with = [
        'project',
        'issues'
    ];

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
