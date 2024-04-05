import { Router } from  'express';
import controllerClientes from  '../controllers/cliente.controller.js';
import { verificarToken } from "../middlewares/Auth.js";
const route = new Router();

// CRUD
route.post('/createClient', controllerClientes.createClient); // Crear un Cliente
route.get('/getClientById/:id', controllerClientes.getClientById); // Buscar un Cliente por ID
route.put('/updateClient/:id', controllerClientes.updateClient); // Actualizar los datos de un Cliente por Id
route.delete('/deleteClient/:id', controllerClientes.deleteClient); // Eliminar a un Cliente por ID

//Otros métodos
route.get('/listClients', controllerClientes.getAllClients); // Listado completo de todos los clientes
route.get('/listClientsofEmployee', verificarToken, controllerClientes.getAllClientsEmployees); // Listado completo de todos los clientes por empleados
route.post('/loginClient', controllerClientes.loginClient) ; // Iniciar sesión cliente en el sistema

export default route;