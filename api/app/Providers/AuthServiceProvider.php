<?php

namespace App\Providers;

use App\Models\AuditEvent;
use App\Models\Issue;
use App\Models\Project;
use App\Models\Setting;
use App\Models\User;
use App\Policies\AuditPolicy;
use App\Policies\IssuePolicy;
use App\Policies\ProjectPolicy;
use App\Policies\RolePolicy;
use App\Policies\SettingPolicy;
use App\Policies\UserPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use Laravel\Passport\Passport;
use App\Services\User\Role;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        User::class => UserPolicy::class,
        Role::class => RolePolicy::class,
        Setting::class => SettingPolicy::class,
        AuditEvent::class => AuditPolicy::class,
        Project::class => ProjectPolicy::class,
        Issue::class => IssuePolicy::class
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Passport::routes();
        Passport::personalAccessTokensExpireIn(now()->addDay());

        /** Set all permission to a super admin user */
        Gate::before(function($user, $ability) {
            return $user->hasRole(Role::ROLE_ADMINISTRATOR) ? true : null;
        });
    }
}
