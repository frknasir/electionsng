<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Incident;

class IncidentType extends Model
{
    /**
     * Eloquent Relationships
     */
    public function incidents() {
        return $this->hasMany(Incident::class);
    }
}
