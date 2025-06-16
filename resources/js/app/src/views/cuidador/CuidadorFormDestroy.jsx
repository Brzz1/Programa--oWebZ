import React, { Fragment, useEffect, useState } from 'react'
import axiosClient from '../../axiosClient';
import { Link, useNavigate, useParams } from 'react-router-dom';

function CuidadorFormDestroy()
{
    const navigate = useNavigate();

    const [cuidador, setCuidador] = useState({
        id:null,
        nome:'',
        CPF:'',
        dataNascimento:'',
        contato:'',
        endereco:'',
    });

    const {id} = useParams();

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
        axiosClient.delete(`/cuidador/destroy/${id}`)
            .then(() =>{
                setCuidador({});
                console.log('cuidador excluído com sucesso');
                navigate('/cuidador/index')
            }).catch((error)=>{
                console.log(error);
            })
    }
    
    return(
        <Fragment>
            <div className="display">
                <div className="card animated fadeinDown">
                    {cuidador.id && <h1>Exclusão de Cuidador: { cuidador.nome}</h1>}

                    <form onSubmit={(e)=>onSubmit(e)}>
                        <input defaultValue={cuidador.nome} placeholder="Nome do cuidador" readOnly={true}/>
                        <input defaultValue={cuidador.CPF} placeholder="CPF do cuidador" readOnly={true}/>
                        <input defaultValue={cuidador.dataNascimento} placeholder="Data de nascimento do cuidador" readOnly={true}/>
                        <input defaultValue={cuidador.contato} placeholder="Contato do cuidador" readOnly={true}/>
                        <input defaultValue={cuidador.endereco} placeholder="Endereco do cuidador" readOnly={true}/>
                        <button className="btn btn-delete">Excluir</button>
                        <Link
                            type='button' 
                            className='btn btn-cancel'
                            to='/cuidador/index'>
                                Cancelar
                        </Link>
                    </form>
                </div>

                
            </div>
        </Fragment>
    )
}

export default CuidadorFormDestroy