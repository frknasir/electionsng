<?php

namespace App\Http\Resources;

use App\Candidate;
use App\User;
use Illuminate\Http\Resources\Json\JsonResource;

class FinalResultResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $candidate = Candidate::findOrFail($this->candidate_id);
        $user = ($this->added_by) ? User::findOrFail($this->added_by)->name : NULL;
        $party = $candidate->politicalParty;
        //return parent::toArray($request); 
        return [
            'id' => $this->id,
            'candidate_id' => $this->candidate_id,
            'candidate_name' => $candidate->aspirant,
            'party' => $party->name.'['.$party->initials.']',
            'party_id' => $party->id,
            'location_id' => $this->location_id,
            'location_type' => $this->location_type,
            'votes' => ($this->votes) ? number_format($this->votes) : "Not Available",
            'added_by_name' => $user,
            'created_at' => ($this->created_at == NULL) ? $this->created_at : date('d M Y - H:i:s', $this->created_at->timestamp),
            'updated_at' => ($this->updated_at == NULL) ? $this->updated_at : date('d M Y - H:i:s', $this->updated_at->timestamp)
        ];
    }
}
