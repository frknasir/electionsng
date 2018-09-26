<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\ElectionType;
use App\State;
use App\User;
use App\Election;

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
        $date = explode(" ", $this->date);
        //return parent::toArray($request);
        return [
            'id' => $this->id,
            'title' => $this->title,
            'election_type_id' => $this->election_type_id,
            'election_type_name' => ElectionType::find($this->election_type_id)->name,
            'state' => Election::find($this->id)->state,
            'date' => $date[0],
            'registered_voters' => $this->registered_voters ? $this->registered_voters : "Not Available",
            'accredited_voters' => $this->accredited_voters ? $this->accredited_voters : "Not Available",
            'votes_cast' => $this->votes_cast ? $this->votes_cast : "Not Available",
            'valid_votes' => $this->valid_votes ? $this->valid_votes : "Not Available",
            'rejected_votes' => $this->rejected_votes ? $this->rejected_votes : "Not Available",
            'added_by' => $this->added_by,
            'added_by_name' => User::find($this->added_by)->name,
            'updated_by' => $this->updated_by,
            'updated_by_name' => User::find($this->updated_by)->name,
            'created_at' => ($this->created_at == NULL) ? $this->created_at : date('d M Y - H:i:s', $this->created_at->timestamp),
            'updated_at' => ($this->updated_at == NULL) ? $this->updated_at : date('d M Y - H:i:s', $this->updated_at->timestamp)
        ];
    }
}
