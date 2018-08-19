<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;
use App\Election;
use App\PoliticalParty;
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
}
