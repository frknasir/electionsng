<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Election;

class ElectionType extends Model
{
    /**
     * Eloquent Relationships
     */
    public function elections() {
        return $this->hasMany(Election::class);
    }
}
