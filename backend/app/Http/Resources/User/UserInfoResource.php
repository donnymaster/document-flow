<?php

namespace App\Http\Resources\User;

use App\Http\Resources\ModelResource;

class UserInfoResource extends ModelResource
{
    public function transformTo(): array
    {
        return [
            'name' => $this->name,
            'surname' => $this->surname,
            'patronymic' => $this->patronymic,
            'email' => $this->email,
            'phone_number' => $this->phone_number,
            'roles' => $this->roles->map->only('title')->flatten()->toArray(),
            'permissions' => $this->getAllPermissions()->map->only('name')->flatten()->toArray(),
        ];
    }
}
