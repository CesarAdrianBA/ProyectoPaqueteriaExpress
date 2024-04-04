import React, { useState } from 'react';
import { useEmployee } from '../context/EmployeeContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  //viene del react-router-dom
  const navigate = useNavigate();
  const { loginEmployee } = useEmployee();
  const [dataEmployee, setDataEmployee] = useState({Correo:'',
  contrasenia:''});
  //creamos una función llamada login para evitar que con la acción del botón submit
  //el navegador actualice la página.

  const login =(e) =>{
    e.preventDefault();
    loginEmployee(dataEmployee,navigate);

    // Validación de los campos del formulario
  if (!dataEmployee.Correo || !dataEmployee.contrasenia) {
    // Si los campos están vacíos, muestra un mensaje de error o toma la acción adecuada
    console.error('Por favor, completa todos los campos');
    return; // Sal de la función sin continuar con el envío del formulario
  }

  // Imprimir los valores que se enviarán al servidor
  // console.log('Datos del empleado a enviar:', dataEmployee);

  // Si la validación pasa, envía los datos al servidor
  loginEmployee(dataEmployee, navigate);
  
  }

  const handleChange = (e) =>{
    setDataEmployee({...dataEmployee, [e.target.name]: e.target.value});
  }

  return (
    <div className='container mt-4'>
    <div className='row'>
      <div className='col-md-6 mx-auto'>
        <div className='card'>
          <div className='container text-center'>
            <i className='fas fa-user fa-5x'></i>
          </div>
          <div className='card-header text-center mt-3'>
            <h4>Inicio de sesión del jefe!!!</h4>
          </div>{/* card-header text-center mt-3 */}
          <div className='card-body'>
            <form onSubmit={login}>
              <div className='mb-3'>
                <label className='form-label'>Correo:</label>
                <input type="email" name="Correo" className='form-control' 
                  onChange={(e) => handleChange(e)} autoFocus required/>
              </div>
              <div className='mb-3'>
                <label className='form-label'>Contraseña:</label>
                <input type="password" name="contrasenia" className='form-control' 
                  onChange={(e) => handleChange(e)} required/>
              </div>{/* mb-3 */}
              <button type="submit" className='form-control btn btn-primary'>
              Login
            </button>
            </form>
          </div>{/* card-body */}
        </div>{/* card */}
      </div>{/* col-md-6 mx-auto */}
    </div>{/* row */}
  </div>//container mt-4
  )
}

export default Login