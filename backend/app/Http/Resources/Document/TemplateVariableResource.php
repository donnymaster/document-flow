<?php

namespace App\Http\Resources\Document;

use App\Http\Resources\ModelResource;

class TemplateVariableResource extends ModelResource
{
    public function transformTo(): array
    {
        return [
            'description' => $this->description,
            'name' => $this->name,
            'key' => $this->key,
        ];
    }
}
