<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class ResetPasswordRequest extends FormRequest
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
            'token' => 'required|string',
            'password' => 'required|confirmed|min:6|case_diff|numbers|letters|symbols'
        ];
    }

    /**
     * @return array
     */
    public function messages()
    {
        return [
            'required' => __('validation.required.general'),
            'string' => __('validation.string'),
            'password.case_diff' => 'Lozinika mora da sadrži i velika i mala slova.',
            'password.numbers' => 'Lozinika mora da sadrži brojeve.',
            'password.letters' => 'Lozinika mora da sadrži slova.',
            'password.symbols' => 'Lozinika mora da sadrži simbole.',
        ];
    }
}
