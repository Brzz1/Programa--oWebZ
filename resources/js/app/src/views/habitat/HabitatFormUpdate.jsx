import {Fragment, useEffect, useState} from "react"
import axiosClient from "../../axiosClient";
import { useNavigate, useParams, Link } from "react-router-dom";
import Input from "../../components/input/Input";
import { useValidarDadosHabitat } from "../../rules/HabitatValidationRules";

export default function HabitatFormUpdate(){

    const navigate = useNavigate();

    const   {
            model,
            setModel,
            error,
            formValid,
            handleBlurField,
            handleChangeField,
    } = useValidarDadosHabitat();

    const {id} = useParams();

    useEffect(() => {
        if (id) {
            axiosClient.get(`/habitat/show/${id}`)
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
            axiosClient.put(`/habitat/update/${id}`, updatedModel)
                .then(()=>{
                    setModel({});
                    console.log("habitat alterado com sucesso");
                    navigate('/habitat/index')
            }).catch((error)=>{
                console.log(error);
            });
        }
        else{
            console.log("Não foi possível alterar o habitat");
        }

    }

    return(
        <Fragment>
            <div className="display">
                <div className="card animated fadeinDown">
                    { model.id && <h1>Alteração do Habitat</h1> }
                    <form onSubmit={(e)=>onSubmit(e)}>
                        <div className="p-20">
                            <Input 
                                id="tipo"
                                type="text"
                                value={model.tipo}
                                placeholder="tipo do habitat"
                                handleChangeField={handleChangeField}
                                handleBlurField={handleBlurField}
                                error={error.tipo}
                                mensagem={error.tipoMensagem}
                            />
                        </div>
                        <div className ="p-20">
                            <Input 
                                id="tamanho"
                                type="text"
                                value={model.tamanho}
                                placeholder="tamanho do habitat"
                                handleChangeField={handleChangeField}
                                handleBlurField={handleBlurField}
                                error={error.tamanho}
                                mensagem={error.tamanhoMensagem}
                            />
                        </div>
                        <button className="btn btn-edit">
                            Salvar
                        </button>
                        <Link type="button" className="btn btn-cancel" to="/habitat/index">
                            Cancelar
                        </Link>

                    </form>
                </div>
            </div>
        </Fragment>
    )
}