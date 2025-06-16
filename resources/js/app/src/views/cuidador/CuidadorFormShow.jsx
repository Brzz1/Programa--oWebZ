import React, { Fragment, useEffect, useState } from 'react'
import axiosClient from '../../axiosClient';
import { useNavigate, useParams } from 'react-router-dom';

function CuidadorFormShow()
{
    const navigate = useNavigate();

    const [cuidador, setCuidador] = useState({
        id:null,
        nome:'',
        dataNascimento:'',
        CPF:'',
        contato:'',
        endereco:'',
    });

    const {id} = useParams();
    console.log(id);

    if (id)
    {
        useEffect(() => {
            axiosClient.get(`/cuidador/show/${id}`)
            .then(({data}) =>{
                setCuidador(data.data);
                console.log(data.data);
            }).catch((error)=>{
                console.log(error);
            })
        },[id]);
    }

    // Função do tipo Anônima
    const onSubmit = (e) => {
        e.preventDefault();
        navigate('/cuidador/index');
    }
    
    return(
        <Fragment>
            <div className="display">
                <div className="card animated fadeInDown">
                    {cuidador.id && <h1>Nome do Cuidador: { cuidador.nome}</h1>}

                <form>
                    <input defaultValue={cuidador.nome} placeholder="Nome do cuidador" readOnly={true}/>
                    <input defaultValue={cuidador.dataNascimento} placeholder="Data de nascimento do cuidador" readOnly={true}/>
                    <input defaultValue={cuidador.CPF} placeholder="CPF do cuidador" readOnly={true}/>
                    <input defaultValue={cuidador.contato} placeholder="Contato do cuidador" readOnly={true}/>
                    <input defaultValue={cuidador.endereco} placeholder="Endereco do cuidador" readOnly={true}/>
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

export default CuidadorFormShow