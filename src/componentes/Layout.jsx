import React, { useState } from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHome } from '@fortawesome/free-solid-svg-icons';
import { faReact } from '@fortawesome/free-brands-svg-icons';

import './Layout.css'

export const Layout = () => {
    const [isOpen, setIsOpen]=useState(false)
    const cambio=()=>setIsOpen(!isOpen)
  return (
    <div className="app-container">
        <nav className='navbar'>
            <button className='menu-btn' onClick={cambio}><FontAwesomeIcon icon={faBars} /></button>
            <div className='navbar-logo'><h2>Poblacion 2026</h2></div>
            <div className='navbar-items'>
                <NavLink to='/' className="menu-btn"><FontAwesomeIcon icon={faHome} /></NavLink>
            </div>
        </nav>
        <div className='contenido-principal'>
            <aside className={`sidebar ${isOpen ? 'open':''}`}>
                <div className='opt'>
                    <h3>Opciones</h3>
                </div>
                <nav className='menu'>
                    <NavLink to='/' className={({isActive})=>(isActive ? 'nav-link active':'nav-link normal')}>Inicio</NavLink>
                    <NavLink to='/provincia' className={({isActive})=>(isActive ? 'nav-link active':'nav-link normal')}>Por provincia</NavLink>
                    <NavLink to='/distrito' className={({isActive})=>(isActive ? 'nav-link active':'nav-link normal')}>Por distrito</NavLink>
                    <NavLink to='/red' className={({isActive})=>(isActive ? 'nav-link active':'nav-link normal')}>Por Red</NavLink>
                    <NavLink to='/micro_red' className={({isActive})=>(isActive ? 'nav-link active':'nav-link normal')}>Por Micro Red</NavLink>
                    <NavLink to='/eess' className={({isActive})=>(isActive ? 'nav-link active':'nav-link normal')}>Por Establecimiento</NavLink>
                </nav>
            </aside>

            <main className="contenido-dinamico">
                <Outlet/>
            </main>
        </div>
    </div>
  )
}
