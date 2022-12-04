<?php

namespace App\Http\Requests\Issue;

use App\Services\Issue\Status;
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
        return [
            'project_id' => 'required|exists:projects,id',
            'issue_type_id' => 'required|exists:issue_types,id',
            'user_id' => 'nullable|exists:users,id',
            'name' => 'required',
            'status' => 'required|in:' . join(',', Status::all()),
            'description' => 'string',
            'attachments' => 'array',
            'attachments.*.name' => 'required',
            'attachments.*.file' => 'required',
        ];
    }
}
