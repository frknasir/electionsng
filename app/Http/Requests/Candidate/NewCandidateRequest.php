<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class NewCandidateRequest extends FormRequest
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
            'political_party_id' => 'required',
            'election_id' => 'required',
            'aspirant' => 'required',
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
          'political_party_id.required'     => 'A political party is required.',
          'election_id.required'  => 'An election should be specified.',
          'aspirant.required'     => 'Aspirant name is required.',
          'added_by.required'    => 'Who is adding this candidate?',
          'updated_by.required'      => 'Who is updating this candidate?'
        ];
    }
}
