<?php

namespace App\Http\Resources\UniversityEntites;

use App\Http\Resources\ModelResource;

class DepartmentGroupResource extends ModelResource
{
    public function transformTo(): array
    {
        return [
            'name' => $this->name,
            'opening_date' => $this->opening_date->format('Y-m-d'),
            'closing_date' => $this->closing_date->format('Y-m-d'),
            'department' => new DepartmentResource($this->whenLoaded($this->department)),
        ];
    }
}
