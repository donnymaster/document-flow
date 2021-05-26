<?php

namespace App\Http\Requests\Lecturer;

use App\Services\UserService;
use Illuminate\Foundation\Http\FormRequest;

class CreateUserRequest extends FormRequest
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
            'email' => 'required|string|email|unique:users,email',
            'phone_number' => 'nullable|string|regex:' . UserService::PHONE_NUMBER_PATTERN,
            'roles' => 'required|array|max:30',
            'roles.*' => 'required|string|exists:roles,name',
        ];
    }
}
