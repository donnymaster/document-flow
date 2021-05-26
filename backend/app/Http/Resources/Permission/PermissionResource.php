<?php

namespace App\Http\Resources\Permission;

use App\Http\Resources\ModelResource;

class PermissionResource extends ModelResource
{
    public function transformTo(): array
    {
        return [
            'name' => $this->name,
            'title' => $this->title,
        ];
    }
}
