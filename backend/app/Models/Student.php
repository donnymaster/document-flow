<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    protected $fillable = [
        'name',
        'surname',
        'patronymic',
        'department_group_id',
    ];

    public function departmentGroup()
    {
        return $this->belongsTo(DepartmentGroup::class);
    }
}
