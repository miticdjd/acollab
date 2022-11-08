<?php

namespace App\Http\Requests\Setting;

use Illuminate\Foundation\Http\FormRequest;
use App\Services\Setting\Pagination;

class PaginationRequest extends FormRequest
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
            Pagination::DEFAULT => 'required|integer',
            Pagination::USERS => 'required|integer',
            Pagination::ROLES => 'required|integer',
            Pagination::COUNTRIES => 'required|integer',
            Pagination::COUNTIES => 'required|integer',
            Pagination::PLACES => 'required|integer',
            Pagination::SEASONS => 'required|integer',
            Pagination::SPORT_CATEGORIES => 'required|integer',
            Pagination::SPORT_COMPETITIONS => 'required|integer',
            Pagination::SPORTS => 'required|integer',
            Pagination::REGISTRATIONS => 'required|integer'
        ];
    }
}
