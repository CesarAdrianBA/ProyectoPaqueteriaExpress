import { Router } from "express";
import controllerEmpleados from  '../controllers/empleado.controller.js';
const route = Router();

// CRUD
route.post( '/createEmployee', controllerEmpleados.createEmployee); // Crear un Empleado
route.get('/getEmployeeById/:id', controllerEmpleados.getEmployeeById ); // Buscar un Emplead por ID
route.put('/updateEmployee/:id', controllerEmpleados.updateEmployee); // Actualizar un Emleado por ID
route.delete("/deleteEmployee/:id", controllerEmpleados.deleteEmployee); // Eliminar un Empleado por ID

//Otros metodos
route.get('/listEmployee', controllerEmpleados.getAllEmployee);  // Listado completo de  los empleados
route.post('/loginEmployee', controllerEmpleados.loginEmployee);  // Iniciar sesión empleado en el sistema

export default route;