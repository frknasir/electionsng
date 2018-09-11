<?php

namespace App\Http\Requests\LiveUpdate;

use Illuminate\Foundation\Http\FormRequest;

class UpdateLiveUpdateRequest extends FormRequest
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
            'description' => 'required'
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
            'id.required' => 'live update id can not be empty',
            'title.required' => 'live update title can not be empty',
            'description.required' => 'live update description can not be empty'
        ];
    }
}
