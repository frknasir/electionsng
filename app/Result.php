<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;
use App\Election;
use App\LocationType;
use App\PoliticalParty;
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

    public function election() {
        return $this->belongstTo(Election::class);
    }

    public function locationType() {
        return $this->belongsTo(LocationType::class);
    }

    public function politicalParty() {
        return $this->belongsTo(PoliticalParty::class);  
    }

    public function location() {
        return $this->morphTo();
    } 
}
