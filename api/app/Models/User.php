<?php

namespace App\Models;

use App\Services\User\Status;
use Database\Factories\UserFactory;
use finfo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Storage;
use Laravel\Passport\HasApiTokens;
use Illuminate\Database\Eloquent\Builder;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasRoles, HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'status',
        'email',
        'password',
        'avatar_url',
        'department_id',
        'team_id',
        'address_id',
        'phone',
        'position_id',
    ];

    /**
     * @var array
     */
    protected $visible = [
        'id',
        'first_name',
        'last_name',
        'username',
        'status',
        'email',
        'avatar_url',
        'roles'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Always load this relationships
     */
    protected $with = [
        'roles'
    ];

    /**
     * Return new factory for a user
     * @return string
     */
    protected static function newFactory()
    {
        return UserFactory::new();
    }

    /**
     * Scope a query to only include active users.
     *
     * @param  Builder  $query
     *
     * @return Builder
     */
    public function scopeActive(Builder $query): Builder
    {
        return $query->where('status', Status::STATUS_ACTIVE);
    }

    public function toArray()
    {
        $data =  parent::toArray();
        $data['avatar'] = $this->getAvatar();
        $data['name'] = $this->first_name . ' ' . $this->last_name;

        return $data;
    }

    /**
     * @return string
     */
    public function getAvatar(): string
    {
        if (strlen($this->avatar_url) === 0) {
            return '';
        }

        $content = Storage::get($this->avatar_url);
        $finfo = new finfo(FILEINFO_MIME_TYPE);
        $type = $finfo->file(storage_path() . '/app/' . $this->avatar_url);

        return 'data:' . $type . ';base64,' . base64_encode($content);
    }
}
