<?php

namespace App\Http\Resources\UniversityEntites;

use App\Http\Resources\ModelResource;

class StudentResource extends ModelResource
{
    public function transformTo(): array
    {
        return [
            'name' => $this->name,
            'surname' => $this->surname,
            'patronymic' => $this->patronymic,
            'department_group' => new DepartmentGroupResource($this->whenLoaded($this->departmentGroup)),
        ];
    }
}
