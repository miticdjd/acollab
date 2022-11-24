<?php

namespace App\Http\Requests\Issue;

use App\Services\Issue\Status;
use Illuminate\Foundation\Http\FormRequest;

class FilterRequest extends FormRequest
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
            'name' => 'string',
            'project_id' => 'array',
            'project_id.*' => 'exists:projects,id',
            'issue_type_id' => 'array',
            'issue_type_id.*' => 'exists:issue_types,id',
            'status' => 'array',
            'status.*' => 'in:' . join(',', Status::all()),
            'user_id' => 'array',
            'user_id.*' => 'exists:users,id',
            'created_at' => 'array',
            'created_at.*' => 'date'
        ];
    }
}
