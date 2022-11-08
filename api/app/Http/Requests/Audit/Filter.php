<?php

namespace App\Http\Requests\Audit;

use Illuminate\Foundation\Http\FormRequest;

class Filter extends FormRequest
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
            'event_type' => 'array',
            'ip_address' => 'string',
            'user_id' => 'array',
            'user_id.*' => 'exists:users,id',
            'created_at' => 'array',
            'created_at.*' => 'date'
        ];
    }
}
