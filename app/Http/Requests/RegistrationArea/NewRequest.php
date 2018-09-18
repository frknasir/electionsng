<?php

namespace App\Http\Requests\RegistrationArea;

use Illuminate\Foundation\Http\FormRequest;

class NewRequest extends FormRequest {
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
            'name' => 'required',
            'local_government_id' => 'required',
            'latitude' => 'required',
            'longitude' => 'required',
            'added_by' => 'required'
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages() {
        return [
            'name.required' => 'registration area name can not be empty',
            'local_government_id.required' => 'local government id can not be empty',
            'latitude.required' => 'latitude can not be empty',
            'longitude.required' => 'longitude can not be empty',
            'added_by.required' => 'Who is adding this registration area?'
        ];
    }
}
