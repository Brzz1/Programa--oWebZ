<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreConsultaRequest extends FormRequest
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
}