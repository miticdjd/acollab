<?php

namespace App\Providers;

use App\Events\FinalistsSendConfirmationEmail;
use App\Events\InterstateSendConfirmationEmail;
use App\Events\NewFinalist;
use App\Events\NewInterstate;
use App\Events\NewRegistration;
use App\Events\UpdateFinalist;
use App\Events\UpdateInterstate;
use App\Events\UpdateRegistration;
use App\Listeners\ProcessFinalist;
use App\Listeners\ProcessFinalistUpdate;
use App\Listeners\ProcessInterstate;
use App\Listeners\ProcessInterstateUpdate;
use App\Listeners\ProcessRegistration;
use App\Listeners\ProcessRegistrationUpdate;
use App\Listeners\ProcessSendFinalistConfirmationEmail;
use App\Listeners\ProcessSendInterstateConfirmationEmail;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        NewRegistration::class => [
            ProcessRegistration::class
        ],
        UpdateRegistration::class => [
            ProcessRegistrationUpdate::class
        ],
        FinalistsSendConfirmationEmail::class => [
            ProcessSendFinalistConfirmationEmail::class
        ],
        InterstateSendConfirmationEmail::class => [
            ProcessSendInterstateConfirmationEmail::class
        ],
        NewFinalist::class => [
            ProcessFinalist::class
        ],
        UpdateFinalist::class => [
            ProcessFinalistUpdate::class
        ],
        NewInterstate::class => [
            ProcessInterstate::class
        ],
        UpdateInterstate::class => [
            ProcessInterstateUpdate::class
        ],
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        parent::boot();

        //
    }
}
