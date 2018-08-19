<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\User;
use App\Result;
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
        return [
            'id' => $this->id,
            'political_party' => PoliticalParty::find($this->political_party_id),
            'election_id' => $this->election_id,
            'location' => Result::find($this->id)->location,
            'votes' => $this->votes,
            'added_by' => $this->added_by,
            'added_by_name' => User::find($this->added_by)->name,
            'updated_by' => $this->updated_by,
            'updated_by_name' => User::find($this->updated_by)->name,
            'created_at' => date('d M Y - H:i:s', $this->created_at->timestamp),
            'updated_at' => date('d M Y - H:i:s', $this->updated_at->timestamp)
        ];
    }
}
