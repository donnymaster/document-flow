<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'short_name',
        'faculty_id',
        'head_department_id',
    ];

    public function faculty()
    {
        return $this->belongsTo(Faculty::class);
    }

    public function headDepartment()
    {
        return $this->belongsTo(User::class, 'head_department_id');
    }
}
