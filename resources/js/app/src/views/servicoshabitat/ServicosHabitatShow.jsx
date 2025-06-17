import {Fragment, useEffect, useState } from "react";
import axiosClient from "../../axiosClientjs";
import { useNavigate, useParams } from "react-router-dom";

export default function ServicosHabitatFormShow(){

    const navigate = useNavigate();

    const [servicoshabitat, setServicosHabitat] = useState({
        id: null,
        habitatId:"",
        servicosId:"",

    });


    const { id } = useParams();

    useEffect(()=>{
        if (id){
            
                axiosClient.get(`/servicoshabitat/show/${id}`)
                .then(({data})=>{
                    setServicosHabitat(data.data);
                }).catch((error)=>{
                    console.log(error);
                });
        }
    },[id]);


    const onSubmit = (e) => {

        e.preventDefault(); //impede que o navegador recarregue a página
        navigate('/servicoshabitat/index');

    }


    return(
        <Fragment>

            <div className="display">

                <div className="card animated fadeinDown">
                    {servicoshabitat.id && <h1>Consulta de servicos-habitat:</h1>}
                    
                

                <form onSubmit={(e)=>onSubmit(e)}>
                    <input defaultValue={servicoshabitat.habitatId} placeholder="Id do habitat" readOnly={true}/>
                    <input defaultValue={servicoshabitat.servicosId} placeholder="Id do servico" readOnly={true}/>

                    <button className="btn btn-cancel">Cancelar</button>

                </form>
                </div>

            </div>


        </Fragment>
    )
}