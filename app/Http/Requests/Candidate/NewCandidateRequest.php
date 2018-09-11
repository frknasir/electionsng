<?php

namespace App\Http\Requests\Candidate;

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
            'political_party_id' => 'required',
            'election_id' => 'required',
            'aspirant' => 'required',
            'bio' => 'required'
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
          'bio' => 'Bio can not be empty'
        ];
    }
}
