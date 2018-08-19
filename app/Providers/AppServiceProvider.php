<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Database\Eloquent\Relations\Relation;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot() {
        Relation::morphMap([
            'state' => 'App\State',
            'localGovernment' => 'App\LocalGovernment',
            'registrationArea' => 'App\RegistrationArea',
            'pollingUnit' => 'App\PollingUnit'
        ]);
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
