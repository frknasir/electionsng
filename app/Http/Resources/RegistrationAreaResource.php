<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\User;
use App\LocalGovernment;
use App\RegistrationArea;

class RegistrationAreaResource extends JsonResource
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
        $registrationArea = RegistrationArea::findOrFail($this->id);
        $puCount = $registrationArea->pollingUnits()->count();

        return [
            'id' => $this->id,
            'name' => $this->name,
            'local_government_id' => $this->local_government_id,
            'local_government_name' => LocalGovernment::find($this->local_government_id)->name,
            'latitude' => $this->latitude,
            'longitude' => $this->longitude,
            'pu_count' => $puCount,
            'added_by' => $this->added_by,
            'added_by_name' => User::find($this->added_by)->name,
            'updated_by' => $this->updated_by,
            'updated_by_name' => User::find($this->updated_by)->name,
            'created_at' => ($this->created_at == NULL) ? $this->created_at : date('d M Y - H:i:s', $this->created_at->timestamp),
            'updated_at' => ($this->updated_at == NULL) ? $this->updated_at : date('d M Y - H:i:s', $this->updated_at->timestamp)
        ];
    }
}
