<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;
use App\IncidentType;
use App\Election;
use Laravel\Scout\Searchable;

class Incident extends Model
{
    use Searchable;
    /**
     * Eloquent Relationships
     */
    public function user() {
        return $this->belongsTo(User::class, 'added_by');
    }

    public function incidentType() {
        return $this->belongsTo(IncidentType::class);
    }

    public function election() {
        return $this->belongsTo(Election::class);
    }

    public function location() {
        return $this->morphTo();
    }
}
