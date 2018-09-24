<?php

namespace App\Http\Requests\Election;

use Illuminate\Foundation\Http\FormRequest;

class UpdateElectionRequest extends FormRequest
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
            'title' => 'required',
            'date' => 'required|date_format:Y-m-d'
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
            'id.required' => 'Election ID is required',
            'title.required' => 'Election title can not be empty.',
            'date.required' => 'Election date is missing',
            'date.date_format' => 'Wrong date format'
        ];
    }
}
