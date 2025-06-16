import React, { Fragment, useEffect, useState } from 'react'
import axiosClient from '../../axiosClient';
import { useNavigate, useParams } from 'react-router-dom';

function AnimalFormShow()
{
    const navigate = useNavigate();

    const [animal, setAnimal] = useState({
        id:null,
        nome:'',
        dataCadastro:'',
        especie:'',
        alimentacao:'',
        sexo:'',
        idade:'',
    });

    const {id} = useParams();
    console.log(id);

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
        navigate('/animal/index');
    }
    
    return(
        <Fragment>
            <div className="display">
                <div className="card animated fadeInDown">
                    {animal.id && <h1>Consulta de Animal: { animal.nome}</h1>}

                <form>
                    <input defaultValue={animal.nome} placeholder="Nome do animal" readOnly={true}/>
                    <input defaultValue={animal.dataCadastro} placeholder="Data de cadastro do animal" readOnly={true}/>
                    <input defaultValue={animal.especie} placeholder="Especie do animal" readOnly={true}/>
                    <input defaultValue={animal.alimentacao} placeholder="Alimentacao do animal" readOnly={true}/>
                    <input defaultValue={animal.sexo} placeholder="Sexo do animal" readOnly={true}/>
                    <input defaultValue={animal.idade} placeholder="Idade do animal" readOnly={true}/>
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

export default AnimalFormShow