<?php

namespace App\Http\Resources\Role;

use App\Http\Resources\ModelResource;
use App\Http\Resources\Permission\PermissionResource;

class RoleResource extends ModelResource
{
    public function transformTo(): array
    {
        return [
            'name' => $this->name,
            'title' => $this->title,
            'permissons' => PermissionResource::collection($this->whenLoaded('permissions')),
        ];
    }
}
