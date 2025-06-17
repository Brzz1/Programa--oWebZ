import React, { Fragment, useEffect, useState } from 'react'
import axiosClient from '../../axiosClient';
import { Link, useNavigate, useParams } from 'react-router-dom';

function HabitatFormDestroy()
{
    const navigate = useNavigate();

    const [habitat, setHabitat] = useState({
        id:null,
        tipo:'',
        tamanho:'',
    });

    const {id} = useParams();

    if (id)
    {
        useEffect(() => {
            axiosClient.get(`/habitat/show/${id}`)
            .then(({data}) =>{
                sethabitat(data.data);
                console.log(data.data);
            }).catch((error)=>{
                console.log(error);
            })
        },[id]);
    }

    // Função do tipo Anônima
    const onSubmit = (e) => {
        e.preventDefault();
        axiosClient.delete(`/habitat/destroy/${id}`)
            .then(() =>{
                setHabitat({});
                console.log('habitat excluído com sucesso');
                navigate('/habitat/index')
            }).catch((error)=>{
                console.log(error);
            })
    }
    
    return(
        <Fragment>
            <div className="display">
                <div className="card animated fadeinDown">
                    {habitat.id && <h1>Exclusão de Habitat: { habitat.tipo}</h1>}

                    <form onSubmit={(e)=>onSubmit(e)}>
                        <input defaultValue={habitat.tipo} placeholder="Tipo do habitat" readOnly={true}/>
                        <input defaultValue={habitat.tamanho} placeholder="Tamanho do habitat" readOnly={true}/>

                        <button className="btn btn-delete">Excluir</button>
                        <Link
                            type='button' 
                            className='btn btn-cancel'
                            to='/habitat/index'>
                                Cancelar
                        </Link>
                    </form>
                </div>

                
            </div>
        </Fragment>
    )
}

export default HabitatFormDestroy