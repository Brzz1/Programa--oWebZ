import {Fragment, useEffect, useState } from "react";
import axiosClient from "../../axiosClientjs";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useValidarDadosservicoshabitatUpdate } from "../../rules/servicoshabitatUpdateValidationRules";
import Select from "../../Componentes/input/Select";

export default function ServicosHabitatFormUpdate(){

    const navigate = useNavigate();

    const {
        model, 
        error,
        setModel, 
        formValid, 
        handleChangeField, 
        handleBlurField
        
    } = useValidarDadosServicosHabitatUpdate();

    const [habitats, sethabitats] = useState([]);
    const [servicoss, setservicoss] = useState([]);

    const {id} = useParams();

    // Carrega os músicos ao montar o componente
    useEffect(() => {
        axiosClient.get('/habitat/index')
            .then(({ data }) => {
                sethabitats(data.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar habitats:", error);
            });
    }, []);
    
    // Carrega os álbuns ao montar o componente
    useEffect(() => {
        axiosClient.get('/servicos/index')
            .then(({ data }) => {
                setservicoss(data.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar servicos:", error);
            });
    }, []);

    useEffect(()=>{
        if (id){
            axiosClient.get(`/servicoshabitat/show/${id}`)
            .then(({data})=>{
                const servicoshabitat = data.data;
                setModel({
                    id: servicoshabitat.id || "",
                    habitatId: servicoshabitat.habitatId?.toString() || "",
                    servicosId: servicoshabitat.servicosId?.toString() || "",
                });
            }).catch((error)=>{
                console.log("Erro ao carregar relação de habitat-servico",error);
            });
        }
    },[id]);


    const onSubmit = (e) => {

        e.preventDefault(); 
        if(formValid()){
        const updatedModel = {...model };
        axiosClient.put(`/servicoshabitat/update/${id}`, updatedModel) 
            .then(()=>{
                setModel({});
                navigate('/servicoshabitat/index');
            }).catch((error)=>{
                console.log(error);
            });
        }
    }

    


    return(
        <Fragment>

            <div className="display">

                <div className="card animated fadeinDown">
                    {model.id && <h1>Alteração de habitat-servicos</h1>}

                <form onSubmit={(e)=>onSubmit(e)}>

                     <div className="p-20">                          
                        <Select
                            id="habitatId"
                            value={model.habitatId}
                            handleChangeField={handleChangeField}
                            handleBlurField={handleBlurField}
                            error={error.habitatId}
                            mensagem={error.habitatIdMensagem}
                        />                     
                    </div>

                    <div className="p-20">                          
                        <Select
                            id="servicosId"
                            value={model.servicosId}
                            handleChangeField={handleChangeField}
                            handleBlurField={handleBlurField}
                            error={error.servicosId}
                            mensagem={error.servicosIdMensagem}

                        />                     
                    </div>

                    <button className="btn btn-edit" to="/servicoshabitat/index">Salvar</button>
                    <Link type="button" className="btn btn-cancel" to="/servicoshabitat/index">Cancelar</Link>
                    

                </form>
                
                </div>

            </div>


        </Fragment>
    )
}
