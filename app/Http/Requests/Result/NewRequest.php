<?php

namespace App\Http\Requests\Result;

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
            'political_party_id' => 'required',
            'election_id' => 'required',
            'location_id' => 'required',
            'location_type' => 'required',
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
            'political_party_id.required' => 'political party id can not be empty',
            'election_id.required' => 'election id can not be empty',
            'location_id.required' => 'location id can not be empty',
            'location_type.required' => 'location type can not be empty',
            'votes' => 'required',
            'added_by.required' => 'Who is adding this registration area?',
            'updated_by.required' => 'Who is updating this registration area?'
        ];
    }
}
