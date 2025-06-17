import {Fragment, useEffect, useState } from "react";
import axiosClient from "../../axiosClientjs";
import { useNavigate, useParams, Link } from "react-router-dom";

export default function ServicosHabitatFormDestroy(){

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

        e.preventDefault(); 
        axiosClient.delete(`/servicoshabitat/destroy/${id}`) 
            .then(()=>{
                setServicosHabitat({});
                console.log('Relação de Músico - Álbum excluída com sucesso');
                navigate('/servicoshabitat/index');
            }).catch((error)=>{
                console.log(error);
            });
    }

    


    return(
        <Fragment>

            <div className="display">

                <div className="card animated fadeinDown">
                    {servicoshabitat.id && <h1>Exclusão de Músico - Álbum:</h1>}
                    
                

                <form onSubmit={(e)=>onSubmit(e)}>
                    <input defaultValue={servicoshabitat.habitatId} placeholder="Id do habitat" readOnly={true}/>
                    <input defaultValue={servicoshabitat.servicosId} placeholder="Id do servico" readOnly={true}/>

                    <button className="btn btn-delete">Excluir</button>
                    <Link type="button" className="btn btn-cancel" to="/servicoshabitat/index">Cancelar</Link>
                    

                </form>

                </div>

            </div>


        </Fragment>
    )
}