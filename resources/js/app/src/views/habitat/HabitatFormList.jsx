import React, { useEffect, useState } from 'react'
import axiosClient from '../../axiosClient';
import { Link } from 'react-router-dom';

export default function HabitatFormList()
{
    const [habitats, setHabitats] = useState([]);

    const getHabitats = () => {
        axiosClient
            .get('/habitat/index')
            .then(({data}) => {
                setHabitats(data.data);
            })
            .catch((error)=>{
                console.log(error);
            });
    }

    useEffect(() => {
        getHabitats();
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
                    <Link to="/habitat/store" className="btn-add">Store</Link>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th className="col-id">Id</th>
                            <th className="col-tipo">tipo</th>
                            <th className="col-tamanho">tamanho</th>
                            <th className='center actions' colSpan={3}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            habitats.length > 0 ? (
                                habitats && habitats.map((habitat) => (
                                    <tr key={habitat.id}>
                                        <td>{habitat.id}</td>
                                        <td>{habitat.tipo}</td>
                                        <td>{habitat.tamanho}</td>
                                        <td className="center actions">
                                            <Link className="btn-show" to={`/habitat/show/${habitat.id}`}>Show</Link>
                                        </td>
                                        <td className="center actions">
                                            <Link className="btn-edit" to={`/habitat/update/${habitat.id}`}>Update</Link>
                                        </td>  
                                        <td className="center actions">
                                            <Link className="btn-delete" to={`/habitat/destroy/${habitat.id}`}>Destroy</Link>
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
