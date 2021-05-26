<?php

namespace App\Http\Resources;

use App\Http\Resources\User\UserResource;

class InfoGekResource extends ModelResource
{
    public $identifier = false;
    public $timestamps = false;

    public function transformTo(): array
    {
        return [
            'group' => $this->group,
            'value' => $this->value,
            'user' => new UserResource($this->whenLoaded('user')),
        ];
    }
}
