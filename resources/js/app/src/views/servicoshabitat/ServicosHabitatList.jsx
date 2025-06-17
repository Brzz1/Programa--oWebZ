import React, { useEffect, useState } from "react";
import axiosClient from "../../axiosClientjs";
import { Link } from "react-router-dom";

export default function ServicosHabitatFormList(){

    const [servicoshabitats, setServicosHabitats] = useState([]);

    const getServicosHabitats = () => {
        axiosClient.get('/servicoshabitat/index')
                    .then(({data}) => {
                    setServicosHabitats(data.data);
                    })
                    .catch(()=>{
                        console.log(error);
                    });

    };

    useEffect(()=>{
        getServicosHabitats();
    },[]);

    //console.log(users);


    return(
        <div>
            
            <div className='display'>
                <div className='card animated fadeInDown'> 
                    <div style={{
                        display:'flex',
                        justifyContent:'space-between',
                        alignItems:'center'
                    }}>
                        <h1>
                            Relação de Músicos - Álbuns
                        </h1>
                        <Link className='btn-add' to="/servicoshabitat/store">Store</Link>

                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Id do Músico</th>
                                <th>Músico</th>
                                <th>Id do Álbum</th>
                                <th>Álbum do Músico</th>
                                <th className='center actions' colSpan={3}>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                servicoshabitats.length > 0 ? (
                                    servicoshabitats.map(servicoshabitat => (
                                        <tr key={servicoshabitat.id} >
                                            <td>{servicoshabitat.id}</td>
                                            <td>{servicoshabitat.musicoId}</td>
                                            <td>{servicoshabitat.albumId}</td>
                                            <td className='center actions'>
                                                <Link className='btn-edit' to={`/servicoshabitat/update/${servicoshabitat.id}`}>Update</Link>
                                            </td>
                                            <td className='center actions'>
                                                <Link className='btn-delete' to={`/servicoshabitat/destroy/${servicoshabitat.id}`}>Destroy</Link>
                                            </td>
                                            <td className='center actions'>
                                                <Link className='btn-show' to={`/servicoshabitat/show/${servicoshabitat.id}`}>Show</Link>
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



        </div>
    )
}
