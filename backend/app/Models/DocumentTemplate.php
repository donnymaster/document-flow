<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DocumentTemplate extends Model
{
    protected $fillable = [
        'name',
        'version',
        'file_path',
    ];

    public function templateVariables()
    {
        return $this->hasMany(TemplateVariable::class);
    }
}
