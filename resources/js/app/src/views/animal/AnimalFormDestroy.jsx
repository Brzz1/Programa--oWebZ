import React, { Fragment, useEffect, useState } from 'react'
import axiosClient from '../../axiosClient';
import { Link, useNavigate, useParams } from 'react-router-dom';

function AnimalFormDestroy()
{
    const navigate = useNavigate();

    const [animal, setAnimal] = useState({
        id:null,
        nome:'',
        dataNascimento:'',
        endereco:'',
        telefone:'',
        email:'',
    });

    const {id} = useParams();

    if (id)
    {
        useEffect(() => {
            axiosClient.get(`/animal/show/${id}`)
            .then(({data}) =>{
                setAnimal(data.data);
                console.log(data.data);
            }).catch((error)=>{
                console.log(error);
            })
        },[id]);
    }

    // Função do tipo Anônima
    const onSubmit = (e) => {
        e.preventDefault();
        axiosClient.delete(`/animal/destroy/${id}`)
            .then(() =>{
                setAnimal({});
                console.log('Animal excluído com sucesso');
                navigate('/animal/index')
            }).catch((error)=>{
                console.log(error);
            })
    }
    
    return(
        <Fragment>
            <div className="display">
                <div className="card animated fadeinDown">
                    {pnimal.id && <h1>Exclusão de Pnimal: { pnimal.nome}</h1>}

                    <form onSubmit={(e)=>onSubmit(e)}>
                        <input defaultValue={animal.nome} placeholder="Nome do Animal" readOnly={true}/>
                        <input defaultValue={animal.dataCadastro} placeholder="Data de cadastro do Animal" readOnly={true}/>
                        <input defaultValue={animal.especie} placeholder="Especie do Animal" readOnly={true}/>
                        <input defaultValue={animal.alimentacao} placeholder="Alimentação do Animal" readOnly={true}/>
                        <input defaultValue={animal.sexo} placeholder="Sexo do Animal" readOnly={true}/>
                        <input defaultValue={animal.idade} placeholder="Idade do Animal" readOnly={true}/>
                        <button className="btn btn-delete">Excluir</button>
                        <Link
                            type='button' 
                            className='btn btn-cancel'
                            to='/animal/index'>
                                Cancelar
                        </Link>
                    </form>
                </div>

                
            </div>
        </Fragment>
    )
}

export default PnimalFormDestroy