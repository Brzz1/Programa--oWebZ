import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useLogin } from '../context/ContextProvider';
import axiosClient from '../axiosClient';

export default function DefaultLayout({children})
{
    // Verificar se o Usuário está logado
    const {token, _setUser, _setToken, user} = useLogin();
    const navigate = useNavigate();
    
    if (!token){
        //return <Navigate to="/login"/>
    }

    const onLogout = (e) => {
        e.preventDefault();
        axiosClient.post('/login', user.email)
            .then(()=>{
                _setUser({});
                _setToken(null);
                navigate('/login');
            })
            .catch((error)=>{
                console.log(error);
        })
        _setUser({});
        _setToken(null);
        navigate('/login');
    }

    return (
    <div id="defaultLayout">
        <aside>
            <Link to="/dashboard"> Dashboard </Link>
            <Link to="/user/index"> Usuários </Link>
            <Link to="/animal/index"> Animais </Link>
            <Link to="/cuidador/index"> Cuidadores </Link>
            <Link to="/habitat/index"> Habitats </Link>
            <Link to="/servicos/index"> Serviços </Link>
            <Link to="/servicoshabitat/index"> ServiçosHabitat </Link>
        </aside>
        <div className='content'>
            <header>
                <div className = 'header'> 
                    Sistema para Zoologico
                </div>
                <div>
                    { user.name } &nbsp; &nbsp;
                    <a onClick={onLogout} className='btn-logout' href="#"> Logout </a>
                </div>
            </header>
            <main className='main-content'>
                { children }
            </main>
        </div>
    </div>
    )
}