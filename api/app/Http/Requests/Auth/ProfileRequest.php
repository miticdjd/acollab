<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class ProfileRequest extends FormRequest
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
            'email' => 'required|email|unique:users,email,' . $this->user()->id,
            'phone' => ['regex:/^([0-9\s\-\+\(\)]*)$/', 'min:9'],
            'address' => 'nullable|array',
            'address.country_id' => 'integer|exists:countries,id',
            'address.city_id' => 'integer|exists:cities,id',
            'address.street' => 'string|max:255',
            'address.number' => 'integer|max:255',
            'address.apartment' => 'string|max:255',
            'address.floor' => 'string|max:255',
            ];
    }
}
