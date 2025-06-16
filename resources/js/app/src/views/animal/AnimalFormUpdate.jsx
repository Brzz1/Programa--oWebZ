import {Fragment, useEffect, useState} from "react"
import axiosClient from "../../axiosClient";
import { useNavigate, useParams, Link } from "react-router-dom";
import Input from "../../components/input/Input";
import { useValidarDadosAnimal } from "../../rules/AnimalValidationRules";

export default function AnimalFormUpdate(){

    const navigate = useNavigate();

    const   {
            model,
            setModel,
            error,
            formValid,
            handleBlurField,
            handleChangeField,
    } = useValidarDadosAnimal();

    const {id} = useParams();

    useEffect(() => {
        if (id) {
            axiosClient.get(`/animal/show/${id}`)
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
            axiosClient.put(`/animal/update/${id}`, updatedModel)
                .then(()=>{
                    setModel({});
                    console.log("Animal alterado com sucesso");
                    navigate('/animal/index')
            }).catch((error)=>{
                console.log(error);
            });
        }
        else{
            console.log("Não foi possível alterar o Animal");
        }

    }

    return(
        <Fragment>
            <div className="display">
                <div className="card animated fadeinDown">
                    { model.id && <h1>Alteração do Animal</h1> }
                    <form onSubmit={(e)=>onSubmit(e)}>
                        <div className="p-20">
                            <Input 
                                id="nome"
                                type="text"
                                value={model.nome}
                                placeholder="Nome do Animal"
                                handleChangeField={handleChangeField}
                                handleBlurField={handleBlurField}
                                error={error.nome}
                                mensagem={error.nomeMensagem}
                            />
                        </div>
                        <div className ="p-20">
                            <Input 
                                id="dataCadastro"
                                type="text"
                                value={model.dataCadastro}
                                placeholder="Data de cadastro do Animal"
                                handleChangeField={handleChangeField}
                                handleBlurField={handleBlurField}
                                error={error.dataCadastro}
                                mensagem={error.dataCadastroMensagem}
                            />
                        </div>
                        <div className ="p-20">
                            <Input 
                                id="especie"
                                type="text"
                                value={model.especie}
                                placeholder="Especie do Animal"
                                handleChangeField={handleChangeField}
                                handleBlurField={handleBlurField}
                                error={error.especie}
                                mensagem={error.especieMensagem}
                            />
                        </div>
                        <div className ="p-20">
                            <Input 
                                id="alimentacao"
                                type="text"
                                value={model.alimentacao}
                                placeholder="Alimentacao do Animal"
                                handleChangeField={handleChangeField}
                                handleBlurField={handleBlurField}
                                error={error.alimentacao}
                                mensagem={error.alimentacaoMensagem}
                            />
                        </div>
                        <div className ="p-20">
                            <Input 
                                id="sexo"
                                type="text"
                                value={model.sexo}
                                placeholder="Sexo do Animal"
                                handleChangeField={handleChangeField}
                                handleBlurField={handleBlurField}
                                error={error.sexo}
                                mensagem={error.sexoMensagem}
                            />
                        </div>
                        <div className ="p-20">
                            <Input 
                                id="idade"
                                type="text"
                                value={model.idade}
                                placeholder="Idade do Animal"
                                handleChangeField={handleChangeField}
                                handleBlurField={handleBlurField}
                                error={error.idade}
                                mensagem={error.idadeMensagem}
                            />
                        </div>
                        <button className="btn btn-edit">
                            Salvar
                        </button>
                        <Link type="button" className="btn btn-cancel" to="/animal/index">
                            Cancelar
                        </Link>

                    </form>
                </div>
            </div>
        </Fragment>
    )
}