<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GeneratedDocument extends Model
{
    protected $fillable = [
        'name',
        'document_template_id',
        'cached',
        'cached_path'
    ];

    public function documentTemplate()
    {
        return $this->belongsTo(DocumentTemplate::class);
    }
}
