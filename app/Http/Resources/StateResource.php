<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\State;
use App\RegistrationArea;
use App\PollingUnit;

class StateResource extends JsonResource
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
        $state = State::findOrFail($this->id);
        $lgCount = $state->localGovernments()->count();

        $lgs = $state->localGovernments()->select('id')->get();
        $raCount = RegistrationArea::whereIn(
            'local_government_id',
            $lgs
        )->count();
        $ras = RegistrationArea::whereIn(
            'local_government_id',
            $lgs
        )->select('id')->get();
        $puCount = PollingUnit::whereIn(
            'registration_area_id',
            $ras
        )->count();

        return [
            'id' => $this->id,
            'name' => $this->name,
            'latitude' => $this->latitude,
            'longitude' => $this->longitude,
            'code' => $this->code,
            'lg_count' => $lgCount,
            'ra_count' => $raCount,
            'pu_count' => $puCount,
            'created_at' => ($this->created_at == NULL) ? $this->created_at : date('d M Y - H:i:s', $this->created_at->timestamp),
            'updated_at' => ($this->updated_at == NULL) ? $this->updated_at : date('d M Y - H:i:s', $this->updated_at->timestamp)
        ];
    }
}
