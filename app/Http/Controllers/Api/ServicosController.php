<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\HttpRequestException;
use App\Models\Servicos;

class ServicosController extends Controller
{
    public function index(Request $request)
    {
        // Configurações da Paginação
        $page = $request->get('page', '1'); // Página Inicial
        $pageSize = $request->get('pageSize', '10'); // Tamanho de Página (Quantos registros numa página)
        $dir = $request->get('dir', 'asc'); // Direção (Crescente ou Decrecente)
        $props = $request->get('props', 'id'); // Propriedades
        $search = $request->get('search', ''); // Pesquisa

        // Seleciona os dados do usuáhorarioInicio
        $query = Servicos::select('id', 'tipo', 'horarioInicio', 'horarioEstimado', 'qtdPessoas')
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
            'message' => 'Registro de Servicos',
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
            'tipo' => 'required|string|max:255',
            'horarioInicio' => 'required|date',
            'horarioEstimado' => 'required|date',
            'qtdPessoas' => 'required|int',
        ]);

        if ($validator->fails()){
            return response()->json([
                'message' => 'Erro nas informações do Servicos',
                'errors' => $validator->errors(),
                'status' => 404,
            ], 404);
        }

        $data = Servicos::create([
            'tipo' => $request->tipo,
            'horarioInicio' => $request->horarioInicio,
            'horarioEstimado' => $request->horarioEstimado,
            'qtdPessoas' => $request->qtdPessoas,
        ]);

        return response()->json([
            'message' => 'Servicos cadastrado com sucesso',
            'data' => $data,
            'status' => 201,
        ],201);
    }

    /**
     * Display the specified resource.
     */

    public function show(Request $request, string $id){
        try{ 
            $data = Servicos::findOrFail($id);
            if(!$data){
                throw new HttpResponseException(
                    response()->json('Servicos não localizado'),
                    404,
                );
            }
        } catch(HttpResponseException $e){
            response()->json($e->getMessage());
         }
        return response()->json([
            'message'=>'Servicos localizado com sucesso',
            'data'=>$data,
            'status'=>200,
        ],200);
    }


    public function update(Request $request, string $id)
    {
        // Id seria a chave primária do usuáhorarioInicio, por exemplo
        
        // Validações 
        $validator = Validator::make($request->all(),[
            'tipo' => 'required|string|max:255',
            'horarioInicio' => 'required|date',
            'horarioEstimado' => 'required|date',
            'qtdPessoas' => 'required|string|max:15',
        ]);

        if ($validator->fails()){
            return response()->json([
                'message' => 'Erro nas informações do Servicos',
                'errors' => $validator->errors(),
                'status' => 404,
            ], 404);
        }

        // Busca o Id do UsuáhorarioInicio
        $data = Servicos::find($id);

        // Caso não encontre
        if (!$data){
            return response()->json([
                'message' => 'Servicos não localizado',
                'data'=>$id,
                'status' => 404,
            ], 404);
        }

        // Atualização do dados do UsuáhorarioInicio
        $data->tipo = $request->tipo ?? $data->tipo; 
        $data->horarioInicio = $request->horarioInicio ?? $data->horarioInicio;
        $data->horarioEstimado = $request->horarioEstimado ?? $data->horarioEstimado;
        $data->qtdPessoas = $request->qtdPessoas ?? $data->qtdPessoas;

        // Salva o UsuáhorarioInicio
        $data->save();

        return response()->json([
            'message' => 'Servicos alterado com sucesso',
            'data' => $data,
            'status' => 200,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
        public function destroy(Request $request, string $id){
        $data = Servicos::find($id);
        if(!$data){
            return response()->json([
                'message'=>'Servicos localizado com sucesso',
                'data'=>$id,
                'status'=>404,
            ],404);
        }
        $data->delete();
        return response()->json([
            'message'=>'Servicos excluído com sucesso',
            'data'=>$data,
            'status'=>200,
        ],200);
    }
}
