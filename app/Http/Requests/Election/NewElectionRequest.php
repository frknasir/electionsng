<?php

namespace App\Http\Requests\Election;

use Illuminate\Foundation\Http\FormRequest;

class NewElectionRequest extends FormRequest
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
            'election_type_id' => 'required',
            'state_id' => 'required',
            'date' => 'required|date_format:Y-m-d|after:today'
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
            'title.required' => 'Election title can not be empty.',
            'election_type_id.required'  => 'Election type can not be empty.',
            'state_id.required' => 'Specify the state please.',
            'date.required' => 'Election date is missing',
            'date.date_format' => 'Wrong date format',
            'date.after' => 'Date must be after today'
        ];
    }
}
