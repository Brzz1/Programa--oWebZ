import React, { useEffect, useState } from 'react'
import axiosClient from '../../axiosClient';
import { Link } from 'react-router-dom';

export default function CuidadorFormList()
{
    const [cuidadors, setCuidadors] = useState([]);

    const getCuidadors = () => {
        axiosClient
            .get('/cuidador/index')
            .then(({data}) => {
                setCuidadors(data.data);
            })
            .catch((error)=>{
                console.log(error);
            });
    }

    useEffect(() => {
        getCuidadors();
    }, []);

    return(
        <div className="display">
            <div className="card animated fadeInDown">
                <div style={{
                    display:'flex',
                    justifyContent:'space-between',
                    alignItems:'center'
                }}>
                    <h1>Médicos</h1> 
                    <Link to="/cuidador/store" className="btn-add">Store</Link>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th className="col-id">Id</th>
                            <th className="col-nome">Nome</th>
                            <th className="col-dataNascimento">dataNascimento</th>
                            <th className="col-CPF">CPF</th>
                            <th className="col-contato">contato</th>
                            <th className="col-endereco">endereco</th>
                            <th className='center actions' colSpan={3}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cuidadors.length > 0 ? (
                                cuidadors && cuidadors.map((cuidador) => (
                                    <tr key={cuidador.id}>
                                        <td>{cuidador.id}</td>
                                        <td>{cuidador.nome}</td>
                                        <td>{cuidador.dataNascimento}</td>
                                        <td>{cuidador.cpf}</td>
                                        <td>{cuidador.contato}</td>
                                        <td>{cuidador.endereco}</td>
                                        <td className="center actions">
                                            <Link className="btn-show" to={`/cuidador/show/${cuidador.id}`}>Show</Link>
                                        </td>
                                        <td className="center actions">
                                            <Link className="btn-edit" to={`/cuidador/update/${cuidador.id}`}>Update</Link>
                                        </td>  
                                        <td className="center actions">
                                            <Link className="btn-delete" to={`/cuidador/destroy/${cuidador.id}`}>Destroy</Link>
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
