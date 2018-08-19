<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

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
        return [
            'id' => $this->id,
            'name' => $this->name,
            'latitude' => $this->latitude,
            'longitude' => $this->longitude,
            'code' => $this->code,
            'created_at' => date('d M Y - H:i:s', $this->created_at->timestamp),
            'updated_at' => date('d M Y - H:i:s', $this->updated_at->timestamp)
        ];
    }
}
