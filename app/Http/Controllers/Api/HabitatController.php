<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\HttpRequestException;
use App\Models\Habitat;

class HabitatController extends Controller
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
        $query = Habitat::select('id', 'tipo', 'tamanho')
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
            'message' => 'Registro de Habitats',
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
            'tamanho' => 'required|string|max:255',
        ]);

        if ($validator->fails()){
            return response()->json([
                'message' => 'Erro nas informações do Habitat',
                'errors' => $validator->errors(),
                'status' => 404,
            ], 404);
        }

        $data = Habitat::create([
            'tipo' => $request->tipo,
            'tamanho' => $request->tamanho,

        ]);

        return response()->json([
            'message' => 'Habitat cadastrado com sucesso',
            'data' => $data,
            'status' => 201,
        ],201);
    }

    /**
     * Display the specified resource.
     */

    public function show(Request $request, string $id){
        try{ 
            $data = Habitat::findOrFail($id);
            if(!$data){
                throw new HttpResponseException(
                    response()->json('Habitat não localizado'),
                    404,
                );
            }
        } catch(HttpResponseException $e){
            response()->json($e->getMessage());
         }
        return response()->json([
            'message'=>'Habitat localizado com sucesso',
            'data'=>$data,
            'status'=>200,
        ],200);
    }


    public function update(Request $request, string $id)
    {

        $validator = Validator::make($request->all(),[
            'tipo' => 'required|string|max:255',
            'tamanho' => 'required|string|max:255',
        ]);

        if ($validator->fails()){
            return response()->json([
                'message' => 'Erro nas informações do Habitat',
                'errors' => $validator->errors(),
                'status' => 404,
            ], 404);
        }


        $data = Habitat::find($id);


        if (!$data){
            return response()->json([
                'message' => 'Habitat não localizado',
                'data'=>$id,
                'status' => 404,
            ], 404);
        }


        $data->tipo = $request->tipo ?? $data->tipo; 
        $data->tamanho = $request->tamanho ?? $data->tamanho;
        $data->save();

        return response()->json([
            'message' => 'Habitat alterado com sucesso',
            'data' => $data,
            'status' => 200,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
        public function destroy(Request $request, string $id){
        $data = Habitat::find($id);
        if(!$data){
            return response()->json([
                'message'=>'Habitat localizado com sucesso',
                'data'=>$id,
                'status'=>404,
            ],404);
        }
        $data->delete();
        return response()->json([
            'message'=>'Habitat excluído com sucesso',
            'data'=>$data,
            'status'=>200,
        ],200);
    }
}
