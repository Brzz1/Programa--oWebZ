import React, { useEffect, useState } from 'react'
import axiosClient from '../../axiosClient';
import { Link } from 'react-router-dom';

export default function AnimalFormList()
{
    const [animals, setAnimals] = useState([]);

    const getAnimals = () => {
        axiosClient
            .get('/animal/index')
            .then(({data}) => {
                setAnimals(data.data);
            })
            .catch((error)=>{
                console.log(error);
            });
    }

    useEffect(() => {
        getAnimals();
    }, []);

    //console.log(users);

    return(
        <div className="display">
            <div className="card animated fadeInDown">
                <div style={{
                    display:'flex',
                    justifyContent:'space-between',
                    alignItems:'center'
                }}>
                    <h1>Animals</h1> 
                    <Link to="/animal/store" className="btn-add">Store</Link>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th className="col-id">Id</th>
                            <th className="col-nome">Nome</th>
                            <th className="col-dataCadastro">Data de Nascimento</th>
                            <th className="col-especie">Endereço</th>
                            <th className="col-alimentacao">alimentacao</th>
                            <th className="col-idade">idade</th>
                            <th className="col-sexo">idade</th>
                            <th className='center actions' colSpan={3}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            animals.length > 0 ? (
                                animals && animals.map((animal) => (
                                    <tr key={animal.id}>
                                        <td>{animal.id}</td>
                                        <td>{animal.nome}</td>
                                        <td>{animal.dataNascimento}</td>
                                        <td>{animal.especie}</td>
                                        <td>{animal.alimentacao}</td>
                                        <td>{animal.idade}</td>
                                        <td>{animal.sexo}</td>
                                        <td className="center actions">
                                            <Link className="btn-show" to={`/animal/show/${animal.id}`}>Show</Link>
                                        </td>
                                        <td className="center actions">
                                            <Link className="btn-edit" to={`/animal/update/${animal.id}`}>Update</Link>
                                        </td>  
                                        <td className="center actions">
                                            <Link className="btn-delete" to={`/animal/destroy/${animal.id}`}>Destroy</Link>
                                        </td> 
                                    </tr>
                                ))
                            ):(
                                <tr>
                                    <td>
                                        Nenhum registro localizado
                                    </td>
                                </tr>
                            )
                            
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
