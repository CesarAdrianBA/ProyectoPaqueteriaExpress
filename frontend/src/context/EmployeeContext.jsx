import axios from "axios";
import Swal from "sweetalert2";
import { createContext, useState, useContext, useEffect } from "react";

const EmployeContext = createContext();
const initialState = { login:false, token: '', name: ''};

export const EmployeeProvider=(props) => {
  //se crea el estado del usuario.
  const [employee, setEmployee] = useState(initialState);

  useEffect(()=>{
    const initial = JSON.parse(localStorage.getItem("employee"));
    //console.log(initial);
    initial ? initial.login && setEmployee(initial) : setEmployee(initialState);
  }, []);
  
  //ahora se crea la función de logearse.
  //recibe la data del empleado y el navigate para poder
  //redirigirse a otras páginas.
  const loginEmployee=async(dataEmployee,navigate)=>{
    try {

      // Verifica que dataEmployee tenga los datos necesarios antes de enviar la solicitud
    if (!dataEmployee.Correo || !dataEmployee.contrasenia) {
      console.error('Correo y contraseña son requeridos');
      return;
    }
    // Ajusta los nombres de los campos para que coincidan con lo esperado por el servidor
    const datosParaEnviar = {
      Correo: dataEmployee.Correo,
      Contrasenia: dataEmployee.contrasenia
    };

      //se hace la petición con el axios, se envía la url y la data
      //que contiene el password y el correo.
      const {data} = await axios.post('http://localhost:4000/api/loginEmployee', datosParaEnviar);
      if(data.ok){
        //si se logeó correctamente se crea un objeto llamado employeeLogin
        //con login, token y name.
        const employeeLogin= {
          login:true,
          token: data.data.token,
          name: data.data.Nombre
        };
        //guardamos el employeeLogin en local storage, como employee, con formato json.
        localStorage.setItem("employee",JSON.stringify(employeeLogin));
        //pasamos al estado setEmployee el employeeLogin
        setEmployee(employeeLogin);
        navigate('./employees');
        //mandamos el mensaje con sweet alert. En el title mandamos em msg que llega
        //del backend
        Swal.fire({
          icon: 'success',
          title: data.message,
          showConfirmButton: false,
          timer: 1500
        });
      }
    } catch (error) {
      if(!error.response.data.ok){
       return Swal.fire({
          icon: 'error',
          title: error.response.data.message,
          showConfirmButton: false,
          timer: 1500
        });
      }
      //si no es un error de backend sino de front end se muestra con
      // la siguiente línea.
      console.log('error en la función login ',error.message);
    }
  };


  const exit=()=>{
    setEmployee(initialState);
    localStorage.removeItem("employee");
  }

  //para poder probar la función loginEmployee, la vamos a exportar, para ello
  //creamos un objeto llamado value.
  const value={
    loginEmployee,
    employee,
    exit,
   };
   return <EmployeContext.Provider value={value} {...props}/>
}

//Ahora exportamos una función llamada useEmployee, para a través de ella
//usar la función loginEmployee.
export function useEmployee(){
  const context=useContext(EmployeContext);
  if(!context){
    throw new Error('useEmployee error');
  }
  return context;
}
