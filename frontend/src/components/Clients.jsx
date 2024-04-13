import React, { useState,useEffect, useCallback  } from 'react';
import { useEmployee } from '../context/EmployeeContext';
import Swal from "sweetalert2";
import axios from 'axios';
import ModalActionsClients from './ModalActionsClients';

const Clients = () => {
    const { employee } = useEmployee();
    const [clientes, setClientes] = useState([]);

    const getClients= useCallback (async()=>{
        try {
          const { data } = await axios.get("/listClients");
            // console.log(data);
            setClientes(data.data);
        } catch (error) {
          if(!error.response.data.ok){
            return Swal.fire({
               icon: 'error',
               title: error.response.data.message,
               showConfirmButton: false,
               timer: 1500
             });
           }
           console.log('error en la función listClients ',error.message);
        }
      },[]);

      useEffect(() => {
        getClients();
      }, [getClients]);

    
      const deleteClient = async (id) => {
        Swal.fire({
          title: "¿Está seguro?",
          text: "Esta acción no es reversible!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, eliminar!",
        }).then(async (result) => {
          if (result.isConfirmed) {
            const { data } = await axios.delete("/deleteClient/" + id);
            getClients();
            Swal.fire({
              icon: "success",
              title: data.message,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      };
  
      
      
      //manejar modal
      const [client, setClients] = useState(false);
      const [edit,setEdit] = useState(false);
      const [open, setOpen] = useState(false);

      const onOpenModal = (edit,client) => {
        setOpen(true);
        setEdit(edit);
        setClients(client);
      }

      const onCloseModal = () => setOpen(false);

      //busqueda
      //método de búsqueda desde el backend
      
      const search = async (value) => {
        try {
          console.log(value);
            if (value === "") {
              return getClients();
            }
            const { data } = await axios.get(`/searchClient/${value}`);
            setClientes(data.data);
          } catch (error) {
            console.log("error en search", error.message);
          }
      };
      

  return (
    <div>
    <nav className='navbar py-4'>
      <div className='container'>
        <div className='col-md-3'>
          <button className='btn btn-primary'
          onClick={()=>onOpenModal(false,{})} >
            <i className='fas fa-plus'></i> Add Cliente
          </button>
        </div>{/*col-md-3*/}
        <div className='col-md-6 ml-auto'>
          <div className='input-group'>
            <input
              className='form-control'
              type="search"
              placeholder='Buscar...'
              aria-label="Search"
              required
              onChange={(e)=>search(e.target.value)}
            />
          </div>{/*input-group*/}
        </div>{/*col-md-6 ml-auto*/}
      </div>{/*container*/}
    </nav>
    <section>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='card'>
              <div className='card-header'>
                <h4>Clientes de {employee.name}</h4>
              </div>
              <div className='table-responsive-lg'>
                <table className='table table-striped'>
                  <thead className='table-dark'>
                    <tr>
                      <th>#</th>
                      <th>Nombre</th>
                      <th>Teléfono</th>
                      <th>Correo</th>
                      <th>Genero</th>
                      <th>Edad</th>
                      <th>Empleado Asignado</th>
                      <th>Opciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                        clientes.map((item,i)=>(
                          <tr key={item._id}>
                            <td>{i+1}</td>
                            <td>{item.Nombre}</td>
                            <td>{item.Telefono}</td>
                            <td>{item.Correo}</td>
                            <td>{item.Genero}</td>
                            <td>{item.Edad}</td>
                            <td>{item.EmpleadoAsignado}</td>
                            <td>
                            <button className='btn btn-danger me-1' onClick={() =>{
                                deleteClient(item._id);
                              }}>
                                <i className='fas fa-trash'></i>
                              </button>
                              <button className='btn btn-warning'
                                onClick={()=> onOpenModal(true,item)}>
                                <i className='fas fa-edit'></i>
                              </button>
                            </td>
                          </tr>
                        ))
                    }
               </tbody>

                </table>
              </div>{/*table-responsive-lg*/}
            </div>{/*card*/}
          </div>{/*col-md-12*/}
        </div>{/*row*/}
      </div> {/*container*/}
    </section>
    <ModalActionsClients
        open={open} 
        onCloseModal={onCloseModal}
        getClients={getClients}
        edit={edit}
        client={client}
      />
  </div>/*return*/

  )
}

export default Clients;