import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './componentes/Layout';
import './componentes/Layout.jsx'
import { Inicio } from './vistas/Inicio';
import { Por_provincia } from './vistas/Por_provincia.jsx';
import { Por_distrito } from './vistas/Por_distrito.jsx';
import { Por_red } from './vistas/Por_red.jsx';
import { Por_micro_red } from './vistas/Por_micro_red.jsx';
import { Por_eess } from './vistas/Por_eess.jsx';
import './App.css'

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={ <Inicio/> } />
          <Route path='/provincia' element={ <Por_provincia/> } />
          <Route path='/distrito' element={ <Por_distrito/> } />
          <Route path='/red' element={ <Por_red/> } />
          <Route path='/micro_red' element={ <Por_micro_red/> } />
          <Route path='/eess' element={ <Por_eess/> } />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
