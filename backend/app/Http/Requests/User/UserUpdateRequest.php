<?php

namespace App\Http\Requests\User;

use App\Services\UserService;
use Illuminate\Foundation\Http\FormRequest;

class UserUpdateRequest extends FormRequest
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
            'patronymic' => 'nullable|string|min:4|max:255',
            'email' => 'nullable|string|email',
            'phone_number' => 'nullable|string|regex:' . UserService::PHONE_NUMBER_PATTERN,
        ];
    }
}
