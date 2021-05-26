<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TemplateVariable extends Model
{
    protected $fillable = [
        'document_template_id',
        'description',
        'name',
        'key',
    ];

    public function documentTemplate()
    {
        return $this->belongsTo(DocumentTemplate::class);
    }
}
