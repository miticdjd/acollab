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
    protected $visible = ['id', 'project_id', 'issue_type_id', 'user_id', 'name', 'code', 'description', 'status', 'project', 'attachments', 'issue_type', 'user'];

    protected $fillable = ['project_id', 'issue_type_id', 'user_id', 'name', 'code', 'description', 'status'];

    /**
     * Guarded fields
     *
     * @var array
     */
    protected $guarded = ['id', 'created_at', 'updated_at'];

    /**
     * Eager load relationships
     *
     * @var array
     */
    protected $with = [
        'issueType',
        'user',
        'project',
        'attachments'
    ];

    /**
     * The "booted" method of the model.
     *
     * @return void
     */
    protected static function booted(): void
    {
        static::created(function ($issue) {
            $created = false;
            do {
                try {
                    $issue->code = $issue->project->code . '-' . $issue->id;
                    $issue->save();
                    $created = true;
                } catch (\Exception $e) {}
            } while (!$created);
        });
    }

    /**
     * Project relationship
     *
     * @return HasOne
     */
    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    /**
     * Issue type relationship
     *
     * @return HasOne
     */
    public function issueType()
    {
        return $this->belongsTo(IssueType::class);
    }

    /**
     * User relationship
     *
     * @return HasOne
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Attachments relationship
     *
     * @return void
     */
    public function attachments()
    {
        return $this->hasMany(IssueAttachment::class);
    }
}
