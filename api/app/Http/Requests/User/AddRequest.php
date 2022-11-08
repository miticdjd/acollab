<?php

namespace App\Http\Requests\User;

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
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:3',
            'country_id' => 'exists:countries,id|nullable',
            'roles.*' => 'exists:roles,id',
            'teams.*' => 'exists:teams,id',
            'departments.*' => 'exists:departments,id',
            'phone' => ['regex:/^([0-9\s\-\+\(\)]*)$/', 'min:9'],
            'position_id' => 'exists:positions,id',
            'address' => 'nullable|array',
            'address.country_id' => 'integer|exists:countries,id',
            'address.city_id' => 'integer|exists:cities,id',
            'address.street' => 'string|max:255',
            'address.number' => 'integer|max:255',
            'address.apartment' => 'string|max:255',
            'address.floor' => 'string|max:255',
            'address.additional_info' => 'string|max:255',
        ];
    }
}
