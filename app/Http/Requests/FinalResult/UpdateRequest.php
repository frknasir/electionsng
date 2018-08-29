<?php

namespace App\Http\Requests\FinalResult;

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
            'votes' => 'required',
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
            'id.required' => 'id can not be empty',
            'votes.required' => 'votes can not be empty',
            'updated_by.required' => 'Who is updating this registration area?'
        ];
    }
}
