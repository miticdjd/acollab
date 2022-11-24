<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class IssueType extends Model
{
    use SoftDeletes;

    /**
     * Visible fields
     *
     * @var array
     */
    protected $visible = ['id', 'name'];

    /**
     * Guarded fields
     *
     * @var array
     */
    protected $guarded = ['id', 'created_at', 'updated_at'];
}
