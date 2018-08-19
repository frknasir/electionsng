<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\LiveUpdate;
use App\Election;
use Laravel\Scout\Searchable;

class LiveUpdate extends Model {
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

    public function location() {
        return $this->morphTo();
    }
}
