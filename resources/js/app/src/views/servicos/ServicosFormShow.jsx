import React, { Fragment, useEffect, useState } from 'react'
import axiosClient from '../../axiosClient';
import { useNavigate, useParams } from 'react-router-dom';

function ServicosFormShow()
{
    const navigate = useNavigate();

    const [servicos, setServicos] = useState({
        id:null,
        tipo:'',
        horarioInicio:'',
        horarioEstimado:'',
        qtdPessoas:'',
        endereco:'',
    });

    const {id} = useParams();
    console.log(id);

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
        navigate('/servicos/index');
    }
    
    return(
        <Fragment>
            <div className="display">
                <div className="card animated fadeInDown">
                    {servicos.id && <h1>tipo de servicos: { servicos.tipo}</h1>}

                <form>
                    <input defaultValue={servicos.tipo} placeholder="tipo do servico" readOnly={true}/>
                    <input defaultValue={servicos.horarioInicio} placeholder="horario de inicio do servico" readOnly={true}/>
                    <input defaultValue={servicos.horarioEstimado} placeholder="horario estimado do servico" readOnly={true}/>
                    <input defaultValue={servicos.qtdPessoas} placeholder="quantidade de pessoas do servico" readOnly={true}/>
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

export default ServicosFormShow