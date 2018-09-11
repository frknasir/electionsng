<?php

namespace App\Http\Requests\Incident;

use Illuminate\Foundation\Http\FormRequest;

class NewIncidentRequest extends FormRequest
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
            'title' => 'required',
            'description' => 'required',
            'incident_type_id' => 'required',
            'election_id' => 'required',
            'location_id' => 'required',
            'location_type' => 'required'
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
            'title.required' => 'Incident title can not be empty',
            'description.required' => 'Incident description can not be empty',
            'incident_type_id.required'  => 'Incident type can not be empty',
            'election_id.required' => 'Election id can not be empty',
            'location_id.required' => 'Specify the location id.',
            'location_type.required' => 'Location type must be specified'
        ];
    }
}
