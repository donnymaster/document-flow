<?php

namespace App\Filters;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class Filter
{
    public $request;
    protected $builder;
    protected $delimiter = ',';

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    public function filters()
    {
        return $this->request->query();
    }

    public function apply(Builder $builder)
    {
        $this->builder = $builder;

        foreach ($this->filters() as $name => $value) {
            $methodName = Str::camel($name);
            if (method_exists($this, $methodName)) {
                call_user_func_array([$this, $methodName], array_filter([$value]));
            }
        }

        return $this->builder;
    }

    protected function createdAt($type)
    {
        return $this->builder->when($this->checkTypeSort($type), function ($query) use ($type) {
            return $query->orderBy('created_at', $type);
        });
    }

    protected function updatedAt($type)
    {
        return $this->builder->when($this->checkTypeSort($type), function ($query) use ($type) {
            return $query->orderBy('updated_at', $type);
        });
    }

    protected function paramToArray($param)
    {
        return explode($this->delimiter, $param);
    }

    protected function checkTypeSort($type)
    {
        $orders = [
            'asc',
            'desc'
        ];

        return in_array($type, $orders);
    }
}
