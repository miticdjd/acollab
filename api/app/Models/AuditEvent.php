<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Modules\Client\Services\Client\Detect;
use Modules\Client\Services\Scope\ClientScope;
use App\Modules\Audit;

class AuditEvent extends Model
{
    use SoftDeletes;

    /**
     * Table name
     * 
     * @var string
     */
    protected $table = 'audit_events';

    /**
     * Visible fields
     * 
     * @var array
     */
    protected $visible = ['id', 'entity_id', 'entity_type', 'user', 'ip_address', 'event_type', 'user_agent', 'data',  'created_at', 'updated_at'];

    /**
     * Guarded fields
     * 
     * @var array
     */
    protected $guarded = ['id', 'created_at', 'updated_at'];

    /**
     * Fields that should be casted
     * 
     * @var array
     */
    protected $casts = ['data' => 'array'];

    /**
     * Load always
     * 
     * @var array
     */
    protected $with = ['user'];

    /**
     * We are using uuid for keys
     */
    public function getKeyType ()
    {
        return 'string';
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Entity relationship
     */
    public function entity()
    {
        return $this->morphTo();
    }
}
