<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateConsultaRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'habitatId'=>'required|string|max:255',
            'servicosId'=>'required|string|max:255',
        ];
        
    }

    public function messages(){
        return [
            'habitatId.required'=>'O id do habitat deve ser informado!',
            'servicosId.required'=>'O id do servico deve ser informado!',

        ];
    }
}