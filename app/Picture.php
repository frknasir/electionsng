<?php

namespace App;

use App\User;
use App\Election;
use Illuminate\Database\Eloquent\Model;

class Picture extends Model
{
    public function user() {
        return $this->belongsTo(User::class, 'added_by');
    }

    public function election() {
        return $this->belongsTo(Election::class);
    }  

    public function location() {
        return $this->morphTo();
    }
} 
