<?php

namespace App\Http\Requests\DocumentTemplate;

use Illuminate\Foundation\Http\FormRequest;

class CreateDocumentTemplateRequest extends FormRequest
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
            'version' => 'required|string|max:255',
            'file_path' => 'required|string||max:255',
            'variables' => 'required|array',
            'variables.*.name' => 'required|string|max:255',
            'variables.*.key' => 'required|string|max:255',
            'variables.*.description' => 'nullable|string'
        ];
    }
}
