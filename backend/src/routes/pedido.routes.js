import { Router } from "express";
import controllerPedidos from  '../controllers/pedido.controller.js';
const route = Router();

// CRUD
route.post( '/createOrder', controllerPedidos.createOrder);  // Crear un Pedido
route.get('/getOrderById/:id', controllerPedidos.getOrderById ); // Buscar un Pedido por ID
route.put('/updateOrder/:id', controllerPedidos.updateOrder); // Actualizar un Pedido por ID
route.delete("/deleteOrder/:id", controllerPedidos.deleteOrder); // Eliminar un Pedido por ID

//Otros metodos
route.get('/listOrder', controllerPedidos.getAllOrder);  // Listado completo de  los Pedidos


export default route;