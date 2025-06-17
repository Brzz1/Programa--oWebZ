import React, { useEffect, useState } from 'react'
import axiosClient from '../../axiosClient';
import { Link } from 'react-router-dom';

export default function ServicosFormList()
{
    const [servicoss, setServicos] = useState([]);

    const getServicos = () => {
        axiosClient
            .get('/servicos/index')
            .then(({data}) => {
                setServicos(data.data);
            })
            .catch((error)=>{
                console.log(error);
            });
    }

    useEffect(() => {
        getServicos();
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
                    <Link to="/servicos/store" className="btn-add">Store</Link>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th className="col-id">Id</th>
                            <th className="col-tipo">tipo</th>
                            <th className="col-horarioInicio">horarioInicio</th>
                            <th className="col-horarioEstimado">horarioEstimado</th>
                            <th className="col-qtdPessoas">qtdPessoas</th>
                            <th className="col-endereco">endereco</th>
                            <th className='center actions' colSpan={3}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            servicoss.length > 0 ? (
                                servicoss && servicoss.map((servicos) => (
                                    <tr key={servicos.id}>
                                        <td>{servicos.id}</td>
                                        <td>{servicos.tipo}</td>
                                        <td>{servicos.horarioInicio}</td>
                                        <td>{servicos.horarioEstimado}</td>
                                        <td>{servicos.qtdPessoas}</td>
                                        <td className="center actions">
                                            <Link className="btn-show" to={`/servicos/show/${servicos.id}`}>Show</Link>
                                        </td>
                                        <td className="center actions">
                                            <Link className="btn-edit" to={`/servicos/update/${servicos.id}`}>Update</Link>
                                        </td>  
                                        <td className="center actions">
                                            <Link className="btn-delete" to={`/servicos/destroy/${servicos.id}`}>Destroy</Link>
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
