<?php

namespace App\Http\Resources\User;

use App\Http\Resources\ModelResource;

class UserResource extends ModelResource
{
    public function transformTo(): array
    {
        return [
            'name' => $this->name,
            'surname' => $this->surname,
            'patronymic' => $this->patronymic,
            'email' => $this->email,
            'phone_number' => $this->phone_number,
            'roles' => RoleResource::collection($this->roles),
        ];
    }
}
