<?php

namespace App\Http\Requests\Picture;

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
        return false;
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
            'qqfile' => 'image|nullable|max:1999',
            'election_id' => 'required',
            'location_id' => 'required',
            'location_type' => 'required',
            'added_by' => 'required',
            'updated_by' => 'required'
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
            'title.required' => 'title can not be empty',
            'description.required' => 'description can not be empty',
            'url.required' => 'picture url can not be empty',
            'election_id.required' => 'Election id can not be empty',
            'location_id.required' => 'Specify the location id.',
            'location_type.required' => 'Location type must be specified',
            'added_by.required' => 'Who is adding this?',
            'updated_by.required' => 'Who is updating this?'
        ];
    }
}
