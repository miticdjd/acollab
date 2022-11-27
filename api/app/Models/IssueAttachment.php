<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class IssueAttachment extends Model
{
    use SoftDeletes;

    /**
     * Visible fields
     *
     * @var array
     */
    protected $visible = ['id', 'issue_id', 'name', 'file', 'mime', 'sha256', 'issue'];

    protected $fillable = ['issue_id', 'name', 'mime', 'sha256'];

    /**
     * Guarded fields
     *
     * @var array
     */
    protected $guarded = ['id', 'created_at', 'updated_at'];

    /**
     * Issue relationship
     *
     * @return HasOne
     */
    public function issue()
    {
        return $this->hasOne(Issue::class);
    }
}
