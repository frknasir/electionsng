<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\RegistrationArea;
use App\Result;
use App\Incident;
use App\LiveUpdate;
use App\Picture;
use Laravel\Scout\Searchable;

class PollingUnit extends Model
{
    use Searchable;
    /**
     * Eloquent Relationships
     */
    public function registrationArea() {
        return $this->belongsTo(RegistrationArea::class);
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
