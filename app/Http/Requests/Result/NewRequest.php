<?php

namespace App\Http\Requests\Result;

use Illuminate\Foundation\Http\FormRequest;

class NewRequest extends FormRequest
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
    public function rules() {
        return [
            'candidate_id' => 'required',
            'location_id' => 'required',
            'location_type' => 'required',
            'votes' => 'required'
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages() {
        return [
            'candidate_id.required' => 'candidate id can not be empty',
            'location_id.required' => 'location id can not be empty',
            'location_type.required' => 'location type can not be empty',
            'votes' => 'required'
        ];
    }
}
