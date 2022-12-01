<?php

namespace App\Http\Requests\Sprint;

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
            'project_id' => 'required|exists:projects,id',
            'name' => 'required',
            'objective' => 'nullable|required',
            'start' => 'required|date',
            'end' => 'required|date',
            'issues' => 'required|array',
            'issues.*' => 'exists:issues,id'
        ];
    }
}
