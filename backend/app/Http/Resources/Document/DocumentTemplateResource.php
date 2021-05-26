<?php

namespace App\Http\Resources\Document;

use App\Http\Resources\ModelResource;
use Illuminate\Support\Facades\Storage;

class DocumentTemplateResource extends ModelResource
{
    public function transformTo(): array
    {
        return [
            'name' => $this->name,
            'version' => $this->version,
            'file_path' => Storage::url($this->file_path),
            'variables' => TemplateVariableResource::collection($this->whenLoaded('templateVariables')),
        ];
    }
}
