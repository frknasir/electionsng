<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;
use App\ElectionType;
use App\Incident;
use App\Candidate;
use App\LiveUpdate;
use App\State;
use App\Result;
use Laravel\Scout\Searchable;

class Election extends Model
{
    use Searchable;
    /**
     * Indicates if the IDs are auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = false;

    /**
     * Eloquent Relationships 
     */
    public function user() {
        return $this->belongsTo(User::class, 'added_by');
    }

    public function electionType() {
        return $this->belongsTo(ElectionType::class);
    }

    public function incidents() {
        return $this->hasMany(Incident::class);
    }

    public function candidates() {
        return $this->hasMany(Candidate::class); 
    }

    public function liveUpdates() {
        return $this->hasMany(LiveUpdate::class);
    }

    public function state() {
        return $this->belongsTo(State::class);
    }
}
