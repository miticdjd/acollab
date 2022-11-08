<?php

namespace App\Http\Requests\Company;

use App\Rules\EmailRule;
use App\Services\Company\Company;
use App\Services\Company\Status;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;

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
     * @return array<string, mixed>
     */
    public function rules()
    {
        $company = $this->route('company');

        return [
            'name' => 'required|string|max:255',
            'name_business' => 'required|string|max:255',
            'name_short' => 'required|string|max:255',
            'incorporation_date' => 'required|date',
            'email' => 'required|email|unique:companies,email,' . ($company ? $company->id : 'id'),
            'company_id' => 'required|string',
            'vat_id' => 'required|string|max:255',
            'in_vat' => 'required|boolean',
            'vat' => 'required|integer',
            'status' => ['required', Rule::in(Status::all())],
            'address' => 'array',
            'address.country_id' => 'integer|exists:countries,id',
            'address.city_id' => 'integer|exists:cities,id',
            'address.street' => 'string|max:255',
            'address.number' => 'string|max:255',
            'address.apartment' => 'string|max:255',
            'address.floor' => 'string|max:255',
            'address.additional_info' => 'string|max:255',
        ];
    }
}
