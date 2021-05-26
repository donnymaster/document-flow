<?php

namespace App\Http\Requests\Department;

use Illuminate\Foundation\Http\FormRequest;

class CreateDepartmentRequest extends FormRequest
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
            'short_name' => 'nullable|string|max:255',
            'faculty_id' => 'required|numeric|exists:faculties,id',
            'head_department_id' => 'nullable|numeric|exists:users,id',
        ];
    }
}
