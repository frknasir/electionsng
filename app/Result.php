<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;
use App\Candidate;
use App\LocationType;
use App\State;
use App\LocalGovernment;
use App\RegistrationArea;
use App\PollingUnit;
use Laravel\Scout\Searchable;

class Result extends Model
{
    use Searchable;
    /**
     * Eloquent Relationships
     */
    public function user() {
        return $this->belongsTo(User::class, 'added_by');
    }

    public function candidate() {
        return $this->belongsTo(Candidate::class);
    }

    public function locationType() {
        return $this->belongsTo(LocationType::class);
    }

    public function location() {
        return $this->morphTo();
    } 
}
