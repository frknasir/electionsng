<?php

namespace App\Http\Requests\PollingUnit;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules() {
        return [
            'id' => 'required',
            'code' => 'required',
            'description' => 'required',
            'latitude' => 'required',
            'longitude' => 'required',
            'updated_by' => 'required'
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages() {
        return [
            'id' => 'polling unit id can not be empty',
            'code.required' => 'polling unit code can not be empty',
            'description.required' => 'polling unit description can not be empty',
            'latitude.required' => 'latitude can not be empty',
            'longitude.required' => 'longitude can not be empty',
            'updated_by.required' => 'Who is updating this polling unit?'
        ];
    }
}
