<?php

namespace App\Http\Requests\Auth;

use App\Services\UserService;
use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
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
            'name' => 'required|string|min:3|max:255',
            'surname' => 'required|string|min:4|max:255',
            'patronymic' => 'required|string|min:4|max:255',
            'email' => 'required|string|email|unique:users,email',
            'phone_number' => 'required|string|regex:' . UserService::PHONE_NUMBER_PATTERN,
            'password' => 'required|string|min:6|max:25',
        ];
    }
}
