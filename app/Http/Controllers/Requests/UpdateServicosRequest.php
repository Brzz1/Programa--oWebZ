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
            'horarioInicio' => 'required|date',
            'horarioEstimado' => 'required|date',
            'qtdPessoas' => 'required|int',
        ];
        
    }

    public function messages(){
        return [
            'tipo.required'=>'O tipo de serviço deve ser informado!',
            'horarioInicio.required'=>'O horario de inicio deve ser informado!',
            'horarioEstimado.required'=>'O horario estimado deve ser informado!',
            'qtdPessoas.required'=>'A quantidade de pessoas deve ser informado!',
        ];
    }
}