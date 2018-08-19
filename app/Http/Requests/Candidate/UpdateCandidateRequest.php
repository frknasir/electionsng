<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCandidateRequest extends FormRequest
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
            'id' => 'required',
            'political_party_id' => 'required',
            'election_id' => 'required',
            'aspirant' => 'required',
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
            'id.required' => 'An id is required',
            'political_party_id.required' => 'A political party is required.',
            'election_id.required' => 'An election should be specified.',
            'aspirant.required' => 'Aspirant name is required.',
            'updated_by.required' => 'Who is updating this candidate?'
        ];
    }
}
