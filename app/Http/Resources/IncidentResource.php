<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\User;
use App\IncidentType;
use App\Incident;

class IncidentResource extends JsonResource
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
            'incident_type_id' => $this->incident_type_id,
            'incident_type_name' => IncidentType::find($this->incident_type_id)->name,
            'election_id' => $this->election_id,
            'location' => Incident::find($this->id)->location,
            'added_by' => $this->added_by,
            'added_by_name' => User::find($this->added_by)->name,
            'updated_by' => $this->updated_by,
            'updated_by_name' => User::find($this->updated_by)->name,
            'created_at' => date('d M Y - H:i:s', $this->created_at->timestamp),
            'updated_at' => date('d M Y - H:i:s', $this->updated_at->timestamp)
        ];
    }
}
