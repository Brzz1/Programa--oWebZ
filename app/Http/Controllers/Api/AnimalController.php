<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\HttpRequestException;
use App\Models\Animal;

class AnimalController extends Controller
{
    public function index(Request $request)
    {
        // Configurações da Paginação
        $page = $request->get('page', '1'); // Página Inicial
        $pageSize = $request->get('pageSize', '10'); // Tamanho de Página (Quantos registros numa página)
        $dir = $request->get('dir', 'asc'); // Direção (Crescente ou Decrecente)
        $props = $request->get('props', 'id'); // Propriedades
        $search = $request->get('search', ''); // Pesquisa

        // Seleciona os dados do usuário
        $query = Paciente::select('id', 'nome', 'dataCadastro', 'alimentacao', 'sexo', 'especie','idade')
            ->whereNull('deleted_at')
            ->orderBy($props, $dir);
        
        // Quantidade de Registros
        $total = $query->count();

        // O número de registros na página
        $data = $query->offset(($page-1) * $pageSize)
            ->limit($pageSize)
            ->get();

        // Quantidade de Páginas
        $totalPages = ceil($total / $pageSize);

        return response()->json([
            'message' => 'Registro de Animais',
            'status' => 200,
            'page' => $page,
            'pageSize' => $pageSize,
            'dir' => $dir,
            'props' => $props,
            'search' => $search,
            'total' => $total,
            'totalPages' => $totalPages,
            'data' => $data,
         ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'nome' => 'required|string|max:255',
            'especie' => 'required|string|max:255',
            'alimentacao' => 'required|string|max:255',
            'dataCadastro' => 'required|date',
            'sexo' => 'required|string|max:255',
            'idade' => 'required|int|max:255',
        ]);

        if ($validator->fails()){
            return response()->json([
                'message' => 'Erro nas informações do animal',
                'errors' => $validator->errors(),
                'status' => 404,
            ], 404);
        }

        $data = Paciente::create([
            'nome' => $request->nome,
            'dataCadastro' => $request->dataCadastro,
            'alimentacao' => $request->alimentacao,
            'sexo' => $request->sexo,
            'especie' => $request->especie,
            'idade' => $request->idade,

        ]);

        return response()->json([
            'message' => 'Animal cadastrado com sucesso',
            'data' => $data,
            'status' => 201,
        ],201);
    }

    /**
     * Display the specified resource.
     */

    public function show(Request $request, string $id){
        try{ 
            $data = Paciente::findOrFail($id);
            if(!$data){
                throw new HttpResponseException(
                    response()->json('Animal não localizado'),
                    404,
                );
            }
        } catch(HttpResponseException $e){
            response()->json($e->getMessage());
         }
        return response()->json([
            'message'=>'Animal localizado com sucesso',
            'data'=>$data,
            'status'=>200,
        ],200);
    }


    public function update(Request $request, string $id)
    {
        // Id seria a chave primária do usuário, por exemplo
        
        // Validações 
        $validator = Validator::make($request->all(),[
            'nome' => 'required|string|max:255',
            'especie' => 'required|string|max:255',
            'alimentacao' => 'required|string|max:255',
            'dataCadastro' => 'required|date',
            'sexo' => 'required|string|max:255',
            'idade' => 'required|int|max:255',
        ]);

        if ($validator->fails()){
            return response()->json([
                'message' => 'Erro nas informações do animal',
                'errors' => $validator->errors(),
                'status' => 404,
            ], 404);
        }

        // Busca o Id do Usuário
        $data = Paciente::find($id);

        // Caso não encontre
        if (!$data){
            return response()->json([
                'message' => 'Animal não localizado',
                'data'=>$id,
                'status' => 404,
            ], 404);
        }

        // Atualização do dados do Usuário
        $data->nome = $request->nome ?? $data->nome; 
        $data->dataCadastro = $request->dataCadastro ?? $data->dataCadastro;
        $data->alimentacao = $request->alimentacao ?? $data->alimentacao;
        $data->sexo = $request->sexo ?? $data->sexo;
        $data->especie = $request->especie ?? $data->especie;
        $data->idade = $request->idade ?? $data->idade;

        // Salva o Usuário
        $data->save();

        return response()->json([
            'message' => 'Animal alterado com sucesso',
            'data' => $data,
            'status' => 200,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
        public function destroy(Request $request, string $id){
        $data = Paciente::find($id);
        if(!$data){
            return response()->json([
                'message'=>'Animal localizado com sucesso',
                'data'=>$id,
                'status'=>404,
            ],404);
        }
        $data->delete();
        return response()->json([
            'message'=>'Animal excluído com sucesso',
            'data'=>$data,
            'status'=>200,
        ],200);
    }
}
