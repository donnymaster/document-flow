<?php

namespace App\Http\Resources\UniversityEntites;

use App\Http\Resources\ModelResource;

class DepartmentResource extends ModelResource
{
    public function transformTo(): array
    {
        return [
            'name' => $this->name,
            'short_name' => $this->short_name,
            'faculty' => new FacultyResource($this->whenLoaded('faculty')),
        ];
    }
}
