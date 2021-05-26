<?php

namespace App\Http\Resources\User;

use App\Http\Resources\ModelResource;

class RoleResource extends ModelResource
{
    public $timestamps = false;

    public function transformTo(): array
    {
        return [
            'name' => $this->name,
			'title' => $this->title,
        ];
    }
}
