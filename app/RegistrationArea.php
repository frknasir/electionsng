<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\LocalGovernment;
use App\PollingUnit;
use App\Result;
use App\Incident;
use App\LiveUpdate;
use App\Picture;
use Laravel\Scout\Searchable;

class RegistrationArea extends Model {
    use Searchable;
    /**
     * Eloquent Relationship
     */
    public function localGovernment() {
        return $this->belongsTo(LocalGovernment::class);
    }

    public function pollingUnits() {
        return $this->hasMany(PollingUnit::class);
    }

    public function results() {
        return $this->morphMany(Result::class, 'location');
    }

    public function incidents() {
        return $this->morphMany(Incident::class, 'location');
    }

    public function liveUpdates() {
        return $this->morphMany(LiveUpdate::class, 'location');
    }

    public function pictures() {
        return $this->morphMany(Picture::class, 'location');
    }
}
