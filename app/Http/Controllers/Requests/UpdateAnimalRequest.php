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
            'especie' => 'required|string|max:255',
            'alimentacao' => 'required|string|max:255',
            'dataCadastro' => 'required|date',
            'sexo' => 'required|string|max:255',
            'idade' => 'required|int|max:255',
        ];
        
    }

    public function messages(){
        return [
            'dataHora.required'=>'A data da consulta deve ser informada!',
            'status.required'=>'O status da consulta deve ser informado!',
            'motivo.required'=>'O motivo da consulta deve ser informado!',
            'pacienteID.required'=>'O ID do paciente deve ser informado!',
            'medicoID.required'=>'O ID do medico deve ser informado!',
        ];
    }
}
