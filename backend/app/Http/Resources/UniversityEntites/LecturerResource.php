<?php

namespace App\Http\Resources\UniversityEntites;

use App\Http\Resources\ModelResource;
use App\Http\Resources\User\UserResource;

class LecturerResource extends ModelResource
{
    public function transformTo(): array
    {
        return [
            'name' => $this->name,
            'surname' => $this->surname,
            'patronymic' => $this->patronymic,
            'department' => new DepartmentResource($this->whenLoaded($this->department)),
            'user' => new UserResource($this->whenLoaded($this->user)),
        ];
    }
}
