import React from 'react'
import { Routes, Route } from 'react-router-dom'
import UserFormList from '../views/user/UserFormList'
import UserFormStore from '../views/user/UserFormStore'
import UserFormUpdate from '../views/user/UserFormUpdate'
import UserFormShow from '../views/user/UserFormShow'
import UserFormDestroy from '../views/user/UserFormDestroy'

import AnimalFormList from '../views/animal/AnimalFormList'
import AnimalFormStore from '../views/animal/AnimalFormStore'
import AnimalFormUpdate from '../views/animal/AnimalFormUpdate'
import AnimalFormShow from '../views/animal/AnimalFormShow'
import AnimalFormDestroy from '../views/animal/AnimalFormDestroy'

import CuidadorFormList from '../views/cuidador/CuidadorFormList'
import CuidadorFormStore from '../views/cuidador/CuidadorFormStore'
import CuidadorFormUpdate from '../views/cuidador/CuidadorFormUpdate'
import CuidadorFormShow from '../views/cuidador/CuidadorFormShow'
import CuidadorFormDestroy from '../views/cuidador/CuidadorFormDestroy'

import HabitatFormList from '../views/habitat/HabitatFormList'
import HabitatFormStore from '../views/habitat/HabitatFormStore'
import HabitatFormUpdate from '../views/habitat/HabitatFormUpdate'
import HabitatFormShow from '../views/habitat/HabitatFormShow'
import HabitatFormDestroy from '../views/habitat/HabitatFormDestroy'

import ServicosFormList from '../views/servicos/ServicosFormList'
import ServicosFormStore from '../views/servicos/ServicosFormStore'
import ServicosFormUpdate from '../views/servicos/ServicosFormUpdate'
import ServicosFormShow from '../views/servicos/ServicosFormShow'
import ServicosFormDestroy from '../views/servicos/ServicosFormDestroy'

import ServicosHabitatFormList from '../views/ServicosHabitat/ServicosHabitatFormList'
import ServicosHabitatFormStore from '../views/ServicosHabitat/ServicosHabitatFormStore'
import ServicosHabitatFormUpdate from '../views/ServicosHabitat/ServicosHabitatFormUpdate'
import PServicosHabitatFormShow from '../views/ServicosHabitat/ServicosHabitatFormShow'
import ServicosHabitatFormDestroy from '../views/ServicosHabitat/ServicosHabitatFormDestroy'

import Layout from './Layout'
import Dashboard from '../components/Dashboard'
import NotFound from '../views/user/NotFound'
import Login from '../views/login/Login'
import Signup from '../views/login/Signup'
import UpdatePassword from '../views/login/UpdatePassword'
import ForgotPassword from '../views/login/ForgotPassword'
import ContextProvider from '../context/ContextProvider'
 
 const Rotas = () => {
   return (
     <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Signup/>}/>
        <Route path='/updatepassword' element={<UpdatePassword/>}/>
        <Route path='/forgotpassword' element={<ForgotPassword/>}/>
        <Route element={<Layout/>}>
        <Route path='/dashboard' element={<Dashboard/>}/>

        <Route path="/user/index" element={<UserFormList />} />
        <Route path="/user/store" element={<UserFormStore />} />
        <Route path="/user/update/:id" element={<UserFormUpdate />} />
        <Route path="/user/show/:id" element={<UserFormShow />} />
        <Route path="/user/destroy/:id" element={<UserFormDestroy />} />

        <Route path="/animal/index" element={<AnimalFormList />} />
        <Route path="/animal/store" element={<AnimalFormStore />} />
        <Route path="/animal/update/:id" element={<AnimalFormUpdate />} />
        <Route path="/animal/show/:id" element={<AnimalFormShow />} />
        <Route path="/animal/destroy/:id" element={<AnimalFormDestroy />} />

        <Route path="/cuidador/index" element={<CuidadorFormList />} />
        <Route path="/cuidador/store" element={<CuidadorFormStore />} />
        <Route path="/cuidador/update/:id" element={<CuidadorFormUpdate />} />
        <Route path="/cuidador/show/:id" element={<CuidadorFormShow />} />
        <Route path="/cuidador/destroy/:id" element={<CuidadorFormDestroy />} />

        <Route path="/habitat/index" element={<HabitatFormList />} />
        <Route path="/habitat/store" element={<HabitatFormStore />} />
        <Route path="/habitat/update/:id" element={<HabitatFormUpdate />} />
        <Route path="/habitat/show/:id" element={<HabitatFormShow />} />
        <Route path="/habitat/destroy/:id" element={<HabitatFormDestroy />} />

        <Route path="/servicos/index" element={<ServicosFormList />} />
        <Route path="/servicos/store" element={<ServicosFormStore />} />
        <Route path="/servicos/update/:id" element={<ServicosFormUpdate />} />
        <Route path="/servicos/show/:id" element={<ServicosFormShow />} />
        <Route path="/servicos/destroy/:id" element={<ServicosFormDestroy />} />

        <Route path="/servicoshabitat/index" element={<ServicosHabitatFormList />} />
        <Route path="/servicoshabitat/store" element={<ServicosHabitatFormStore />} />
        <Route path="/servicoshabitat/update/:id" element={<ServicosHabitatFormUpdate />} />
        <Route path="/servicoshabitat/show/:id" element={<ServicosHabitatFormShow />} />
        <Route path="/servicoshabitat/destroy/:id" element={<ServicosHabitatFormDestroy />} />

        </Route>
        <Route path="*" element={<NotFound/>}/>
     </Routes>
   )
 }
 
 export default Rotas