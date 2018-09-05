<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\User;
use App\Result;
use App\Candidate;
use App\PoliticalParty;

class ResultResource extends JsonResource {
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        //return parent::toArray($request);
        $candidate = Candidate::findOrFail($this->candidate_id);
        $user = ($this->added_by) ? User::findOrFail($this->added_by)->name : NULL;
        $party = $candidate->politicalParty;
        $location = ($this->id) ? Result::findOrFail($this->id)->location : NULL;
        return [
            'id' => $this->id,
            'candidate_id' => $this->candidate_id,
            'candidate_name' => $candidate->aspirant,
            'party' => $party->name.'['.$party->initials.']',
            'location' => $location,
            'votes' => ($this->votes) ? number_format($this->votes) : "Not Available",
            'added_by_name' => $user,
            'created_at' => ($this->created_at == NULL) ? $this->created_at : date('d M Y - H:i:s', $this->created_at->timestamp),
            'updated_at' => ($this->updated_at == NULL) ? $this->updated_at : date('d M Y - H:i:s', $this->updated_at->timestamp)
        ]; 
    }
}
