import React, { Fragment, useEffect, useState } from 'react'
import axiosClient from '../../axiosClient';
import { useNavigate, useParams } from 'react-router-dom';

function HabitatFormShow()
{
    const navigate = useNavigate();

    const [habitat, setHabitat] = useState({
        id:null,
        tipo:'',
        tamanho:'',
        CPF:'',
        contato:'',
        endereco:'',
    });

    const {id} = useParams();
    console.log(id);

    if (id)
    {
        useEffect(() => {
            axiosClient.get(`/habitat/show/${id}`)
            .then(({data}) =>{
                setHabitat(data.data);
                console.log(data.data);
            }).catch((error)=>{
                console.log(error);
            })
        },[id]);
    }

    // Função do tipo Anônima
    const onSubmit = (e) => {
        e.preventDefault();
        navigate('/habitat/index');
    }
    
    return(
        <Fragment>
            <div className="display">
                <div className="card animated fadeInDown">
                    {habitat.id && <h1>tipo do Habitat: { habitat.tipo}</h1>}

                <form>
                    <input defaultValue={habitat.tipo} placeholder="Tipo do habitat" readOnly={true}/>
                    <input defaultValue={habitat.tamanho} placeholder="Tamanho do habitat" readOnly={true}/>
                    <button
                        className="btn"
                        onClick={(e)=>onSubmit(e)}>
                        Cancelar
                    </button>
                </form>
            </div>
        </div>
        </Fragment>
    )
}

export default HabitatFormShow