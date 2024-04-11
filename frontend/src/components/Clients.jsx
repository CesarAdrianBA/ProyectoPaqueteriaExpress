import React, { useState,useEffect, useCallback  } from 'react';
import { useEmployee } from '../context/EmployeeContext';
import Swal from "sweetalert2";
import axios from 'axios';

const Clients = () => {
    const { employee } = useEmployee();
    const [clientes, setClientes] = useState([]);

    const getClients= useCallback (async()=>{
        try {
          const { data } = await axios.get("/listClientsofEmployee");
            console.log(data);
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
  
  return (
    <div>
    <nav className='navbar py-4'>
      <div className='container'>
        <div className='col-md-3'>
          <button className='btn btn-primary'>
            <i className='fas fa-plus'></i> Add empleado
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
                      <th>Nombres</th>
                      <th>Teléfono</th>
                      <th>Correo</th>
                      <th>Genero</th>
                      <th>Edad</th>
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
                            <td>
                            <button className='btn btn-danger me-1' onClick={() =>{
                                deleteClient(item._id);
                              }}>
                                <i className='fas fa-trash'></i>
                              </button>
                              <button className='btn btn-warning'>
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
  </div>/*return*/

  )
}

export default Clients;