<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\User;
use App\LiveUpdate;

class LiveUpdateResource extends JsonResource
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
            'description' => $this->description,
            'election_id' => $this->election_id,
            'location' => LiveUpdate::find($this->id)->location,
            'location_type' => $this->location_type,
            'added_by' => $this->added_by,
            'added_by_name' => User::find($this->added_by)->name,
            'updated_by' => $this->updated_by,
            'updated_by_name' => User::find($this->updated_by)->name,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }
}
