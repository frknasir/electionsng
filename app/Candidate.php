<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;
use App\Election;
use App\PoliticalParty;
use App\Result;
use App\FinalResult;
use Laravel\Scout\Searchable;

class Candidate extends Model
{
    use Searchable;
    /**
     * Eloquent Relationships
     */
    public function user() {
        return $this->belongsTo(User::class, 'added_by');
    }

    public function election() {
        return $this->belongsTo(Election::class);
    }

    public function politicalParty() {
        return $this->belongsTo(PoliticalParty::class);
    }

    public function results() { 
        return $this->hasMany(Result::class);
    }

    public function finalResult() {
        return $this->hasOne(FinalResult::class);
    }
}
