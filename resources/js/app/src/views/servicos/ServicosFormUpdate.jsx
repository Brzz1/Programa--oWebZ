import {Fragment, useEffect, useState} from "react"
import axiosClient from "../../axiosClient";
import { useNavigate, useParams, Link } from "react-router-dom";
import Input from "../../components/input/Input";
import { useValidarDadosServicos } from "../../rules/ServicosValidationRules";

export default function ServicosFormUpdate(){

    const navigate = useNavigate();

    const   {
            model,
            setModel,
            error,
            formValid,
            handleBlurField,
            handleChangeField,
    } = useValidarDadosServicos();

    const {id} = useParams();

    useEffect(() => {
        if (id) {
            axiosClient.get(`/servicos/show/${id}`)
                .then(({ data }) => {
                    setModel(data.data);
                }).catch((error) => {
                    console.log(error);
                });
        }
    }, [id]);

    const onSubmit = (e) => {

        e.preventDefault();

        if(formValid()){
            const updatedModel = { ...model };
            axiosClient.put(`/servicos/update/${id}`, updatedModel)
                .then(()=>{
                    setModel({});
                    console.log("servico alterado com sucesso");
                    navigate('/servicos/index')
            }).catch((error)=>{
                console.log(error);
            });
        }
        else{
            console.log("Não foi possível alterar o servico");
        }

    }

    return(
        <Fragment>
            <div className="display">
                <div className="card animated fadeinDown">
                    { model.id && <h1>Alteração do Servico</h1> }
                    <form onSubmit={(e)=>onSubmit(e)}>
                        <div className="p-20">
                            <Input 
                                id="tipo"
                                type="text"
                                value={model.tipo}
                                placeholder="tipo do servico"
                                handleChangeField={handleChangeField}
                                handleBlurField={handleBlurField}
                                error={error.tipo}
                                mensagem={error.tipoMensagem}
                            />
                        </div>
                        <div className ="p-20">
                            <Input 
                                id="horarioInicio"
                                type="text"
                                value={model.horarioInicio}
                                placeholder="horario de inicio do servico"
                                handleChangeField={handleChangeField}
                                handleBlurField={handleBlurField}
                                error={error.horarioInicio}
                                mensagem={error.horarioInicioMensagem}
                            />
                        </div>
                        <div className ="p-20">
                            <Input 
                                id="horarioEstimado"
                                type="text"
                                value={model.horarioEstimado}
                                placeholder="horario estimado do servico"
                                handleChangeField={handleChangeField}
                                handleBlurField={handleBlurField}
                                error={error.horarioEstimado}
                                mensagem={error.horarioEstimadoMensagem}
                            />
                        </div>
                        <div className ="p-20">
                            <Input 
                                id="qtdPessoas"
                                type="text"
                                value={model.qtdPessoas}
                                placeholder="quantidade de pessoas do servico"
                                handleChangeField={handleChangeField}
                                handleBlurField={handleBlurField}
                                error={error.qtdPessoas}
                                mensagem={error.qtdPessoasMensagem}
                            />
                        </div>
                        <button className="btn btn-edit">
                            Salvar
                        </button>
                        <Link type="button" className="btn btn-cancel" to="/servicos/index">
                            Cancelar
                        </Link>

                    </form>
                </div>
            </div>
        </Fragment>
    )
}