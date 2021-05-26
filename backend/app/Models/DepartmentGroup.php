<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DepartmentGroup extends Model
{
    protected $fillable = [
        'name',
        'opening_date',
        'closing_date',
        'department_id',
    ];

    protected $casts = [
        'opening_date' => 'datetime',
        'closing_date' => 'datetime',
    ];

    public function department()
    {
        return $this->belongsTo(Department::class);
    }
}
