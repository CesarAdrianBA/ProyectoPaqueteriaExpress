import { Modal } from 'react-responsive-modal';
import React, { useState, useEffect } from 'react';
import Swal from "sweetalert2";
import axios from 'axios';

const ModalActionsEmployees = ({open, onCloseModal, getEmployees, edit, employee}) => {

  const initialState = {
    Nombre: "",
    Telefono: "",
    Correo: "",
    Cargo: "",
    Jefe: "",
    Contrasenia: "",
  };

  const [dataEmployee, setDataEmployee] = useState(initialState);
  const Cargo = ['Administrador', 'Empleado', 'Agente de ventas', 'Repartidor'];

  useEffect(() => {
    edit ? setDataEmployee(employee) : setDataEmployee(initialState);
    //eslint-disable-next-line
  }, [edit, employee]);

  const handleChange = (e) => {
    setDataEmployee({ ...dataEmployee, [e.target.name]: e.target.value });
  };

  const actions=async(e)=>{
    try {
      e.preventDefault();
      let resp={};
      edit ? (resp=await axios.put(`/updateEmployee/${employee._id}`,dataEmployee))
           : (resp= await axios.post("/createEmployee",dataEmployee));
      Swal.fire({
       icon: 'success',
       title: resp.data.data.message,
       showConfirmButton: false,
       timer: 1500
      });
      onCloseModal();
      getEmployees();
    } catch (error) {
      if(!error.response.data.ok){
        return Swal.fire({
           icon: 'error',
           title: error.response.data.message,
           showConfirmButton: false,
           timer: 1500
         });
       }
       console.log('error en la función actions',error.message);
    }
  }

  return (
    <div>
      <Modal open={open} onClose={onCloseModal} center>
    	  <div className='card'>
          <div className='card-header'>
            <h5>{edit ? 'Update empleado':'Add Empleado'}</h5>
          </div>{/*card-header*/}
          <div className='card-body'>
            <form onSubmit={actions}>
              <div className='mb-3'>
                <label className='form-label'>Nombres:</label>
                <input type="text" className='form-control'
                  name="Nombre" required autoFocus
                  onChange={(e) => handleChange(e)}
                  value={dataEmployee.Nombre}
                />
              </div>{/*mb-3*/}
              <div className='mb-3'>
                <label className='form-label'>Telefono:</label>
                <input type="text" className='form-control' name="Telefono" 
                  required onChange={(e) => handleChange(e)}
                  value={dataEmployee.Telefono}
                />
              </div>{/*mb-3*/}
              <div className='mb-3'>
                <label className='form-label'>Correo:</label>
                <input type="email" className='form-control'
                  name="Correo" required onChange={(e) => handleChange(e)}
                  value={dataEmployee.Correo}
                />
              </div>{/*mb-3*/}
              <div className='mb-3'>
                <label className='form-label'>Cargo:</label>
                <select name="Cargo" className='form-select'
                  onChange={(e) => handleChange(e)}
                  value={dataEmployee.Cargo} >
                  {
                    Cargo.map((item)=>(
                      <option key={item}>{item}</option>
                    ))
                  }
                </select>
              </div>{/*mb-3*/}
              <div className='mb-3'>
                <label className='form-label'>Jefe:</label>
                <input type="text" className='form-control'
                  name="Jefe" required onChange={(e) => handleChange(e)}
                  value={dataEmployee.Jefe}
                />
              </div>{/*mb-3*/}
              <div className='mb-3'>
                <label className='form-label'>Contraseña:</label>
                <input type="password" className='form-control'
                  name="Contrasenia" required onChange={(e) => handleChange(e)}
                  value={dataEmployee.Contrasenia}
                />
              </div>{/*mb-3*/}
              <div className='mb-3'>
                <button type="submit" className='btn btn-primary form-control'>
                  {edit ? 'Actualizar':'Guardar'}
                </button>
              </div>{/*mb-3*/}
            </form>
          </div>{/*card-body */}
        </div>{/*card*/}
  	</Modal>
    </div>
  )
}

export default ModalActionsEmployees