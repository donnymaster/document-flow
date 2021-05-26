<?php

namespace App\Http\Resources\Document;

use App\Http\Resources\ModelResource;

class GeneratedDocumentResource extends ModelResource
{
    public function transformTo(): array
    {
        return [
            'name' => $this->name,
            'template' => new DocumentTemplateResource($this->whenLoaded('documentTemplate')),
            'cached' => $this->cached,
            'cached_path' => $this->cached_path,
        ];
    }
}
