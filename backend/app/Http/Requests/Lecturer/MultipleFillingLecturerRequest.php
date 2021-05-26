<?php

namespace App\Http\Requests\Lecturer;

use Illuminate\Foundation\Http\FormRequest;

class MultipleFillingLecturerRequest extends FormRequest
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
            'lecturers' => 'required|array|min:1|max:100',
            'lecturers.*.name' => 'required|string|max:255',
            'lecturers.*.surname' => 'required|string|max:255',
            'lecturers.*.patronymic' => 'required|string|max:255',
            'lecturers.*.department_id' => 'required|numeric|exists:departments,id',
        ];
    }
}
