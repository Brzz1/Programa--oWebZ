import React, { Fragment, useEffect, useState } from 'react'
import axiosClient from '../../axiosClient';
import { Link, useNavigate, useParams } from 'react-router-dom';

function ServicosFormDestroy()
{
    const navigate = useNavigate();

    const [servicos, setServicos] = useState({
        id:null,
        tipo:'',
        rio:'',
        rio:'',
        qtdPessoas:'',
    });

    const {id} = useParams();

    if (id)
    {
        useEffect(() => {
            axiosClient.get(`/servicos/show/${id}`)
            .then(({data}) =>{
                setServicos(data.data);
                console.log(data.data);
            }).catch((error)=>{
                console.log(error);
            })
        },[id]);
    }

    // Função do tipo Anônima
    const onSubmit = (e) => {
        e.preventDefault();
        axiosClient.delete(`/servicos/destroy/${id}`)
            .then(() =>{
                setServicos({});
                console.log('servico excluído com sucesso');
                navigate('/servicos/index')
            }).catch((error)=>{
                console.log(error);
            })
    }
    
    return(
        <Fragment>
            <div className="display">
                <div className="card animated fadeinDown">
                    {servicos.id && <h1>Exclusão de servicos: { servicos.tipo}</h1>}

                    <form onSubmit={(e)=>onSubmit(e)}>
                        <input defaultValue={servicos.tipo} placeholder="tipo do servico" readOnly={true}/>
                        <input defaultValue={servicos.horarioInicio} placeholder="horario de inicio do servico" readOnly={true}/>
                        <input defaultValue={servicos.horarioEstimado} placeholder="horario estimado do servico" readOnly={true}/>
                        <input defaultValue={servicos.qtdPessoas} placeholder="quantidade de pessoas do servico" readOnly={true}/>
                        <button className="btn btn-delete">Excluir</button>
                        <Link
                            type='button' 
                            className='btn btn-cancel'
                            to='/servicos/index'>
                                Cancelar
                        </Link>
                    </form>
                </div>

                
            </div>
        </Fragment>
    )
}

export default ServicosFormDestroy