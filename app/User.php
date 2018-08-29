<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Passport\HasApiTokens;
use App\Role;
use App\Election;
use App\PoliticalParty;
use App\Candidate;
use App\Incident;
use App\LiveUpdate;
use App\Result;
use App\FinalResult;
use Laravel\Scout\Searchable;

class User extends Authenticatable
{
    use HasApiTokens,Notifiable,Searchable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * Eloquent Relationships
     */

    public function roles() {
        return $this->belongsToMany(Role::class);
    }

    public function elections() {
        return $this->hasMany(Election::class, 'added_by');
    }

    public function politicalParties() {
        return $this->hasMany(PoliticalParty::class, 'added_by');
    }

    public function candidates() {
        return $this->hasMany(Candidate::class, 'added_by');
    }

    public function incidents() {
        return $this->hasMany(Incident::class, 'added_by');
    }

    public function liveUpdates() {
        return $this->hasMany(LiveUpdate::class, 'added_by');
    }

    public function results() {
        return $this->hasMany(Result::class, 'added_by');
    }

    public function finalResult() {
        return $this->hasMany(FinalResult::class, 'added_by');
    }

    /**

    * @param string|array $roles

    */

    public function authorizeRoles($roles) {
        if (is_array($roles)) {
            return $this->hasAnyRole($roles) || 
                abort(401, 'This action is unauthorized.');
        }

        return $this->hasRole($roles) || 
            abort(401, 'This action is unauthorized.');
    }

    /**
    * Check multiple roles
    * @param array $roles
    */
    public function hasAnyRole($roles) {
        return null !== $this->roles()->whereIn(‘name’, $roles)->first();
    }

    /**
    * Check one role
    * @param string $role
    */
    public function hasRole($role) {
        return null !== $this->roles()->where(‘name’, $role)->first();
    }
}
