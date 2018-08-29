<?php

namespace App\Http\Requests\FinalResult;

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
    public function rules() {
        return [
            'candidate_id' => 'required',
            'votes' => 'required',
            'added_by' => 'required',
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
            'candidate.required' => 'Candidate id can not be empty',
            'votes.require' => 'Votes can not be empty',
            'added_by.required' => 'Who is adding this registration area?',
            'updated_by.required' => 'Who is updating this registration area?'
        ];
    }
}
