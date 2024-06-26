import React from 'react';
import { NavLink } from 'react-router-dom';
import { useEmployee } from '../context/EmployeeContext';

const Nav = () => {
  const {employee,exit}=useEmployee();

  if (!employee.token) {
    return null;
  }

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
    <div className="container">
      <NavLink to='/' className='navbar-brand'>Inicio</NavLink>
      <NavLink to='#' className='navbar-brand'>Bienvenido:{employee.name}</NavLink>
      <button className='navbar-toggler' type="button"
            data-bs-toggle="collapse" aria-controls="navbarNav"
            data-bs-target="#navbarNav" aria-expanded="false"
            aria-label="Toggle navigation"
      > <span className='navbar-toggler-icon'></span>
      </button>
      {
        employee.login? (
      <div className='collapse navbar-collapse' id='navbarNav'>
        <ul className='navbar-nav ms-auto'>
          <li className='nav-item'>
            <NavLink className='nav-link' to='/employees'>
              <i className='fas fa-user'> Empleados</i>
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className='nav-link' to='/clients'>
              <i className='fas fa-user'>Clientes</i>
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className='nav-link' to='/register'>
              <i className='fas fa-user'>Registrar</i>
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className='nav-link' to='/envio'>
              <i className='fas fa-user'>Envios</i>
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className='nav-link' to='/' onClick={()=>exit()}>
              <i className='fas fa-user-times'> Salir</i>
            </NavLink>
          </li>
        </ul>
      </div>):(
      <div className='collapse navbar-collapse' id='navbarNav'>
        <ul className='navbar-nav ms-auto'>
          <li className='nav-item'>
            <NavLink className='nav-link' to='/register'>
              <i className='fas fa-user-plus'> Registrarme</i>
            </NavLink>
          </li>
        </ul>
      </div>)/*collapse navbar-collapse*/
      }
    </div>{/*container*/}
  </nav>
  );
}

export default Nav