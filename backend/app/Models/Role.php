<?php

namespace App\Models;

use App\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Spatie\Permission\Models\Role as SpatieRole;

class Role extends SpatieRole
{
    const SECRETARY = 'secretary';
    const MEMBER_GEC = 'member_gec';
    const HEAD_DEPARTMENT = 'head_department';

    public static function getRoles()
    {
        return [
            self::SECRETARY,
            self::MEMBER_GEC,
            self::HEAD_DEPARTMENT,
        ];
    }

    public function scopeFilter(Builder $builder, Filter $filter)
    {
        return $filter->apply($builder);
    }
}
