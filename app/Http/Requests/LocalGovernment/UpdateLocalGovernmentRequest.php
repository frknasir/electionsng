<?php

namespace App\Http\Requests\LocalGovernment;

use Illuminate\Foundation\Http\FormRequest;

class UpdateLocalGovernmentRequest extends FormRequest
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
            'id' => 'required',
            'latitude' => 'required',
            'longitude' => 'required',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'id.required' => 'local government id can not be empty',
            'latitude.required' => 'latitude can not be empty',
            'longitude.required' => 'longitude can not be empty'
        ];
    }
}
