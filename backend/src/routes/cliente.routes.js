import { Router } from  'express';
import controllerClientes from  '../controllers/cliente.controller.js';
const route = new Router();

// CRUD
route.post('/createClient', controllerClientes.createClient); //Crear un cliente
route.get('/getClientById/:id', controllerClientes.getClientById); // Buscar un cliente
route.put('/updateClient/:id', controllerClientes.updateClient);// Actualizar los datos de un cliente
route.delete('/deleteClient/:id', controllerClientes.deleteClient);// Eliminar a un cliente

export default route;