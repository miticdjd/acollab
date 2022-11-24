<?php

namespace App\Http\Requests\Issue;

use App\Services\Issue\Status;
use Illuminate\Foundation\Http\FormRequest;

class EditStatusRequest extends FormRequest
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
            'status' => 'required|in:' . join(',', Status::all()),
        ];
    }
}
