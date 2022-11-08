<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Token extends Model
{
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'type',
        'value',
        'is_used',
        'expire_at'
    ];

    /**
     * @var array
     */
    protected $visible = [
        'id',
        'user',
        'type',
        'value',
        'is_used',
        'expire_at',
    ];

    protected $casts = [
        'is_used' => 'bool'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
