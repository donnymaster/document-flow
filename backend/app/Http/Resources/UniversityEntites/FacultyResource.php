<?php

namespace App\Http\Resources\UniversityEntites;

use App\Http\Resources\ModelResource;

class FacultyResource extends ModelResource
{
    public function transformTo(): array
    {
        return [
            'name' => $this->name,
            'short_name' => $this->short_name,
            'departments' => DepartmentResource::collection($this->whenLoaded('departments')),
        ];
    }
}
