<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\ElectionType;
use App\State;
use App\User;

class ElectionResource extends JsonResource
{
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
            'title' => $this->title,
            'election_type_id' => $this->election_type_id,
            'election_type_name' => ElectionType::find($this->election_type_id)->name,
            'state_id' => $this->state_id,
            'state_name' => State::find($this->state_id)->name,
            'registered_voters' => $this->registered_voters,
            'accredited_voters' => $this->accredited_voters,
            'votes_cast' => $this->votes_cast,
            'valid_votes' => $this->valid_votes,
            'rejected_votes' => $this->rejected_votes,
            'added_by' => $this->added_by,
            'added_by_name' => User::find($this->added_by)->name,
            'updated_by' => $this->updated_by,
            'updated_by_name' => User::find($this->updated_by)->name,
            'created_at' => date('d M Y - H:i:s', $this->created_at->timestamp),
            'updated_at' => date('d M Y - H:i:s', $this->updated_at->timestamp)
        ];
    }
}
