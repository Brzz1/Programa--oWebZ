<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\HttpRequestException;
use App\Models\Cuidador;

class CuidadorController extends Controller
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
        $query = Cuidador::select('id', 'nome', 'CPF', 'email', 'contato', 'endereco')
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
            'message' => 'Registro de Cuidador',
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
            'CPF' => 'required|string|max:11',
            'email' => 'required|string|email|max:255|unique:cuidador,email',
            'contato' => 'required|string|max:15',
            'endereco' => 'required|string|endereco|max:255',
        ]);

        if ($validator->fails()){
            return response()->json([
                'message' => 'Erro nas informações do Cuidador',
                'errors' => $validator->errors(),
                'status' => 404,
            ], 404);
        }

        $data = Cuidador::create([
            'nome' => $request->nome,
            'CPF' => $request->CPF,
            'email' => $request->email,
            'contato' => $request->contato,
            'endereco' => $request->endereco,

        ]);

        return response()->json([
            'message' => 'Cuidador cadastrado com sucesso',
            'data' => $data,
            'status' => 201,
        ],201);
    }

    /**
     * Display the specified resource.
     */

    public function show(Request $request, string $id){
        try{ 
            $data = Cuidador::findOrFail($id);
            if(!$data){
                throw new HttpResponseException(
                    response()->json('Cuidador não localizado'),
                    404,
                );
            }
        } catch(HttpResponseException $e){
            response()->json($e->getMessage());
         }
        return response()->json([
            'message'=>'Cuidador localizado com sucesso',
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
            'CPF' => 'required|string|max:11',
            'email' => 'required|string|email|max:255|unique:cuidador,email',
            'contato' => 'required|string|max:15',
            'endereco' => 'required|string|endereco|max:255'.$id,
        ]);

        if ($validator->fails()){
            return response()->json([
                'message' => 'Erro nas informações do Cuidador',
                'errors' => $validator->errors(),
                'status' => 404,
            ], 404);
        }

        // Busca o Id do Usuário
        $data = Cuidador::find($id);

        // Caso não encontre
        if (!$data){
            return response()->json([
                'message' => 'Cuidador não localizado',
                'data'=>$id,
                'status' => 404,
            ], 404);
        }

        // Atualização do dados do Usuário
        $data->nome = $request->nome ?? $data->nome; 
        $data->CPF = $request->CPF ?? $data->CPF;
        $data->email = $request->email ?? $data->email;
        $data->contato = $request->contato ?? $data->contato;
        $data->endereco = $request->endereco ?? $data->endereco;

        // Salva o Usuário
        $data->save();

        return response()->json([
            'message' => 'Cuidador alterado com sucesso',
            'data' => $data,
            'status' => 200,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
        public function destroy(Request $request, string $id){
        $data = Cuidador::find($id);
        if(!$data){
            return response()->json([
                'message'=>'Cuidador localizado com sucesso',
                'data'=>$id,
                'status'=>404,
            ],404);
        }
        $data->delete();
        return response()->json([
            'message'=>'Cuidador excluído com sucesso',
            'data'=>$data,
            'status'=>200,
        ],200);
    }
}
