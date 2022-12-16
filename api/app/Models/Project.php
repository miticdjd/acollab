<?php

namespace App\Models;

use App\Services\Project\UserType;
use Database\Factories\ProjectFactory;
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
        'status',
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
     * Return new factory for a project
     * @return string
     */
    protected static function newFactory()
    {
        return ProjectFactory::new();
    }

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
