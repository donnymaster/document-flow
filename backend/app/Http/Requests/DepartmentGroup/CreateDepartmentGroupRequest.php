<?php

namespace App\Http\Requests\DepartmentGroup;

use Illuminate\Foundation\Http\FormRequest;

class CreateDepartmentGroupRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'opening_date' => 'required|date|date_format:Y-m-d',
            'closing_date' => 'required|date|date_format:Y-m-d',
            'department_id' => 'required|numeric|exists:departments,id',
        ];
    }
}
