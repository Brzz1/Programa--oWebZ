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
            'nome' => 'required|string|max:255',
            'CPF' => 'required|string|max:11',
            'email' => 'required|string|email|max:255|unique:cuidador,email',
            'contato' => 'required|string|max:15',
            'endereco' => 'required|string|endereco|max:255',
        ];
        
    }

    public function messages(){
        return [
            'nome.required'=>'O nome do cuidador deve ser informado!',
            'CPF.required'=>'O CPF do cuidador deve ser informado!',
            'email.required'=>'O email do cuidador deve ser informado!',
            'contato.required'=>'O contato do cuidador deve ser informado!',
            'endereco.required'=>'O endereco do cuidador deve ser informado!',
        ];
    }
}