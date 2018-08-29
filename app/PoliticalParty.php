<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;
use App\Result;
use App\Candidate;
use Laravel\Scout\Searchable;

class PoliticalParty extends Model
{
    use Searchable;
    /**
     * Eloquent Relationship
     */
    public function user() {
        return $this->belongsTo(User::class, 'added_by');
    }

    public function candidates() {
        return $this->hasMany(Candidate::class);
    }
}
