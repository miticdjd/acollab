<?php

namespace App\Http\Requests\Project;

use Illuminate\Foundation\Http\FormRequest;

class AddRequest extends FormRequest
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
            'name' => 'required',
            'code' => 'required|string|size:3|unique:projects,code',
            'description' => 'required',
            'managers' => 'array',
            'managers.*' => 'exists:users,id',
            'developers' => 'array',
            'developers.*' => 'exists:users,id'
        ];
    }

    /**
     * Validation messages
     *
     * @return array
     */
    public function messages()
    {
        return [
            'code.unique' => 'Kod projekta mora da bude unikatan.'
        ];
    }
}
