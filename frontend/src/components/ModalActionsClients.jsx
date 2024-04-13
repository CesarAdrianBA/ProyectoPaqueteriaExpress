import { Modal } from 'react-responsive-modal';
import React, { useState, useEffect } from 'react';
import Swal from "sweetalert2";
import axios from 'axios';

const ModalActionsClients = ({ open, onCloseModal, getClients, edit, client }) => {

  const initialState = {
    Nombre: "",
    Telefono: "",
    Correo: "",
    Genero: "",
    Edad: "",
    EmpleadoAsignado: "",
    Contrasenia: ""
  };

  const [dataClient, setDataClient] = useState(initialState);

  useEffect(() => {
    console.log("Este es el cliente",client);
    edit ? setDataClient(client) : setDataClient(initialState);
    //eslint-disable-next-line
  }, [edit, client]);

  const handleChange = (e) => {
    setDataClient({ ...dataClient, [e.target.name]: e.target.value });
  };

  const actions = async (e) => {
    try {
      e.preventDefault();
      let resp = {};
      edit ? (resp = await axios.put(`/updateClient/${client._id}`, dataClient))
        : (resp = await axios.post("/createClient", dataClient));
      Swal.fire({
        icon: 'success',
        title: resp.data.data.message,
        showConfirmButton: false,
        timer: 1500
      });
      onCloseModal();
      getClients();
    } catch (error) {
      if (!error.response.data.ok) {
        Swal.fire({
          icon: 'error',
          title: error.response.data.message,
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        console.log('Error en la función actions:', error.message);
      }
    }
  }

  return (
    <div>
      <Modal open={open} onClose={onCloseModal} center>
        <div className='card'>
          <div className='card-header'>
            <h5>{edit ? 'Actualizar cliente' : 'Agregar Cliente'}</h5>
          </div>
          <div className='card-body'>
            <form onSubmit={actions}>
              <div className='mb-3'>
                <label className='form-label'>Nombres:</label>
                <input type="text" className='form-control'
                  name="Nombre" required autoFocus
                  onChange={(e) => handleChange(e)}
                  value={dataClient.Nombre}         
                />
              </div>
              <div className='mb-3'>
                <label className='form-label'>Telefono:</label>
                <input type="text" className='form-control'
                  name="Telefono" required autoFocus
                  onChange={(e) => handleChange(e)}
                  value={dataClient.Telefono}         
                />
              </div>
              <div className='mb-3'>
                <label className='form-label'>Correo:</label>
                <input type="text" className='form-control'
                  name="Correo" required autoFocus
                  onChange={(e) => handleChange(e)}
                  value={dataClient.Correo}         
                />
              </div>
             
              <div className='mb-3'>
                <label className='form-label'>Genero:</label>
                <input type="text" className='form-control'
                  name="Genero" required autoFocus
                  onChange={(e) => handleChange(e)}
                  value={dataClient.Genero}         
                />
              </div>
              <div className='mb-3'>
                <label className='form-label'>Edad:</label>
                <input type="number" className='form-control'
                  name="Edad" required autoFocus
                  onChange={(e) => handleChange(e)}
                  value={dataClient.Edad}         
                />
              </div>
              <div className='mb-3'>
                <label className='form-label'>Empleado asignado:</label>
                <input type="text" className='form-control'
                  name="EmpleadoAsignado" required autoFocus
                  onChange={(e) => handleChange(e)}
                  value={dataClient.EmpleadoAsignado}         
                />
              </div>




              <div className='mb-3'>
                <button type="submit" className='btn btn-primary form-control'>
                  {edit ? 'Actualizar' : 'Guardar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default ModalActionsClients;