<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\User;

class UserResource extends JsonResource
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
        $user = User::find($this->id);
        $roles = $user->roles ;

        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'about' => $this->about,
            'thumbnail' => $this->thumbnail,
            'roles' => $roles,
            'created_at' => date('d M Y - H:i:s', $this->created_at->timestamp),
            'updated_at' => date('d M Y - H:i:s', $this->updated_at->timestamp)
        ];
    }
}
