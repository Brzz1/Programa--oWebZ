import {Fragment, useEffect, useState} from "react"
import axiosClient from "../../axiosClient";
import { useNavigate, useParams, Link } from "react-router-dom";
import Input from "../../components/input/Input";
import { useValidarDadoscuidador } from "../../rules/CuidadorValidationRules";

export default function CuidadorFormUpdate(){

    const navigate = useNavigate();

    const   {
            model,
            setModel,
            error,
            formValid,
            handleBlurField,
            handleChangeField,
    } = useValidarDadosCuidador();

    const {id} = useParams();

    useEffect(() => {
        if (id) {
            axiosClient.get(`/cuidador/show/${id}`)
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
            axiosClient.put(`/cuidador/update/${id}`, updatedModel)
                .then(()=>{
                    setModel({});
                    console.log("Cuidador alterado com sucesso");
                    navigate('/cuidador/index')
            }).catch((error)=>{
                console.log(error);
            });
        }
        else{
            console.log("Não foi possível alterar o Cuidador");
        }

    }

    return(
        <Fragment>
            <div className="display">
                <div className="card animated fadeinDown">
                    { model.id && <h1>Alteração do Cuidador</h1> }
                    <form onSubmit={(e)=>onSubmit(e)}>
                        <div className="p-20">
                            <Input 
                                id="nome"
                                type="text"
                                value={model.nome}
                                placeholder="Nome do Cuidador"
                                handleChangeField={handleChangeField}
                                handleBlurField={handleBlurField}
                                error={error.nome}
                                mensagem={error.nomeMensagem}
                            />
                        </div>
                        <div className ="p-20">
                            <Input 
                                id="dataNascimento"
                                type="text"
                                value={model.dataNascimento}
                                placeholder="Data de nascimento do Cuidador"
                                handleChangeField={handleChangeField}
                                handleBlurField={handleBlurField}
                                error={error.dataNascimento}
                                mensagem={error.dataNascimentoMensagem}
                            />
                        </div>
                        <div className ="p-20">
                            <Input 
                                id="CPF"
                                type="text"
                                value={model.CPF}
                                placeholder="CPF do Cuidador"
                                handleChangeField={handleChangeField}
                                handleBlurField={handleBlurField}
                                error={error.CPF}
                                mensagem={error.CPFMensagem}
                            />
                        </div>
                        <div className ="p-20">
                            <Input 
                                id="contato"
                                type="text"
                                value={model.contato}
                                placeholder="Contato do Cuidador"
                                handleChangeField={handleChangeField}
                                handleBlurField={handleBlurField}
                                error={error.contato}
                                mensagem={error.contatoMensagem}
                            />
                        </div>
                        <div className ="p-20">
                            <Input 
                                id="endereco"
                                type="text"
                                value={model.endereco}
                                placeholder="Endereco do Cuidador"
                                handleChangeField={handleChangeField}
                                handleBlurField={handleBlurField}
                                error={error.endereco}
                                mensagem={error.enderecoMensagem}
                            />
                        </div>
                        <button className="btn btn-edit">
                            Salvar
                        </button>
                        <Link type="button" className="btn btn-cancel" to="/cuidador/index">
                            Cancelar
                        </Link>

                    </form>
                </div>
            </div>
        </Fragment>
    )
}