import React, { useState,useEffect, useCallback  } from 'react';
import { useEmployee } from '../context/EmployeeContext';
import Swal from "sweetalert2";
import axios from 'axios';

const Employees = () => {
    const { employee } = useEmployee();
    const [empleados, setEmpleados] = useState([]);

    const getEmployees= useCallback (async()=>{
        try {
          const { data } = await axios.get("/listEmployee");
            //console.log(data);
            setEmpleados(data.data);
        } catch (error) {
          if(!error.response.data.ok){
            return Swal.fire({
               icon: 'error',
               title: error.response.data.message,
               showConfirmButton: false,
               timer: 1500
             });
           }
           console.log('error en la función getEmployees ',error.message);
        }
      },[]);

      useEffect(() => {
        getEmployees();
      }, [getEmployees]);

    
  
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
                <h4>Empleados de {employee.name}</h4>
              </div>
              <div className='table-responsive-lg'>
                <table className='table table-striped'>
                  <thead className='table-dark'>
                    <tr>
                      <th>#</th>
                      <th>Nombres</th>
                      <th>Teléfono</th>
                      <th>Correo</th>
                      <th>Cargo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                        empleados.map((item,i)=>(
                          <tr key={item._id}>
                            <td>{i+1}</td>
                            <td>{item.Nombre}</td>
                            <td>{item.Telefono}</td>
                            <td>{item.Correo}</td>
                            <td>{item.Cargo}</td>
                            <td>
                              <button className='btn btn-danger me-1'>
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

export default Employees;