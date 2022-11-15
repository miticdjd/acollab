<?php

namespace App\Models;

use App\Services\Project\UserType;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'code',
        'description'
    ];

    /**
     * @var array
     */
    protected $visible = [
        'id',
        'name',
        'code',
        'description',
        'managers',
        'developers'
    ];

    /**
     * Always load this relationships
     */
    protected $with = [
        'managers',
        'developers'
    ];


    /**
     * Users that are managers on project
     *
     * @return BelongsToMany
     */
    public function managers()
    {
        return $this->belongsToMany(User::class)->wherePivot('type', UserType::TYPE_MANAGER);
    }

    /**
     * Users that are developers on project
     *
     * @return BelongsToMany
     */
    public function developers()
    {
        return $this->belongsToMany(User::class)->wherePivot('type', UserType::TYPE_DEVELOPER);
    }
}
