<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\State;
use App\LocalGovernment;
use App\PollingUnit;

class LocalGovernmentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $localGovernment = LocalGovernment::findOrFail($this->id);
        $raCount = $localGovernment->registrationAreas()->count();

        $ras = $localGovernment->registrationAreas()->select('id')->get();
        $puCount = PollingUnit::whereIn(
            'registration_area_id',
            $ras
        )->count(); 

        //return parent::toArray($request);
        return [
            'id' => $this->id,
            'name' => $this->name,
            'state_id' => $this->state_id,
            'state_name' => State::find($this->state_id)->name,
            'latitude' => $this->latitude,
            'longitude' => $this->longitude,
            'ra_count' => $raCount,
            'pu_count' => $puCount,
            'created_at' => ($this->created_at == NULL) ? $this->created_at : date('d M Y - H:i:s', $this->created_at->timestamp),
            'updated_at' => ($this->updated_at == NULL) ? $this->updated_at : date('d M Y - H:i:s', $this->updated_at->timestamp)
        ];
    }
}
