<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Election;
use App\LocalGovernment;
use App\Result;
use App\Incident;
use App\LiveUpdate;
use Laravel\Scout\Searchable;

class State extends Model {
    use Searchable;
    /**
     * Eloquent Relationships
     */
    public function elections() {
        return $this->hasMany(Election::class);
    }

    public function localGovernments() {
        return $this->hasMany(LocalGovernment::class);
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
}
