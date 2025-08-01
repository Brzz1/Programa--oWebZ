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
            'tipo' => 'required|string|max:255',
            'tamanho' => 'required|string|max:255',
        ];
        
    }

    public function messages(){
        return [
            'tipo.required'=>'O tipo de habitat deve ser informado!',
            'tamanho.required'=>'O tamanho do habitat deve ser informado!',

        ];
    }
}