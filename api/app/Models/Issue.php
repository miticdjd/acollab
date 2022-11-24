<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Issue extends Model
{
    use SoftDeletes;

    /**
     * Visible fields
     *
     * @var array
     */
    protected $visible = ['id', 'project_id', 'issue_type_id', 'user_id', 'name', 'code', 'description', 'status', 'project', 'issue_type', 'user'];

    protected $fillable = ['project_id', 'issue_type_id', 'user_id', 'name', 'code', 'description', 'status'];

    /**
     * Guarded fields
     *
     * @var array
     */
    protected $guarded = ['id', 'created_at', 'updated_at'];

    /**
     * Project relationship
     *
     * @return HasOne
     */
    public function project()
    {
        return $this->hasOne(Project::class);
    }

    /**
     * Issue type relationship
     *
     * @return HasOne
     */
    public function issueType()
    {
        return $this->hasOne(IssueType::class);
    }

    /**
     * User relationship
     *
     * @return HasOne
     */
    public function user()
    {
        return $this->hasOne(User::class);
    }
}
