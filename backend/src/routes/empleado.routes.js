import { Router } from "express";
import controllerEmpleados from  '../controllers/empleado.controller.js';
const route = Router();

// CRUD
route.post( '/createEmployee', controllerEmpleados.createEmployee);
route.get('/getEmployeeById/:id', controllerEmpleados.getEmployeeById );
route.put('/updateEmployee/:id', controllerEmpleados.updateEmployee);
route.delete("/deleteEmployee/:id", controllerEmpleados.deleteEmployee);

//Otros metodos
route.get('/listEmployee', controllerEmpleados.getAllEmployee);  // Listado completo de  los empleados
route.post('/loginEmployee', controllerEmpleados.loginEmployee);  // Iniciar sesión empleado en el sistema

export default route;