<?php

namespace App\Http\Requests\Project;

use Illuminate\Foundation\Http\FormRequest;

class EditRequest extends FormRequest
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
        $project = $this->route('project');

        return [
            'name' => 'required',
            'code' => 'required|string|size:3|unique:projects,code,' . ($project ? $project->id : 'id'),
            'description' => 'required',
            'managers' => 'array',
            'managers.*' => 'exists:users,id',
            'developers' => 'array',
            'developers.*' => 'exists:users,id'
        ];
    }
}
