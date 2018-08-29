<?php

namespace App;

use App\User;
use App\Candidate;
use Illuminate\Database\Eloquent\Model;

class FinalResult extends Model
{
    /**
     * Eloquent Relationships
     */
    public function user() {
        return $this->belongsTo(User::class, 'added_by');
    }

    public function candidate() {
        return $this->belongsTo(Candidate::class);
    }
} 
