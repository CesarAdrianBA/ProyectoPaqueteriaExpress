import { Router } from "express";
import controllerPedidos from  '../controllers/pedido.controller.js';
const route = Router();

// CRUD
route.post( '/createOrder', controllerPedidos.createOrder);
route.get('/getOrderById/:id', controllerPedidos.getOrderById );
route.put('/updateOrder/:id', controllerPedidos.updateOrder);
route.delete("/deleteOrder/:id", controllerPedidos.deleteOrder);

//Otros metodos
route.get('/listOrder', controllerPedidos.getAllOrder);  // Listado completo de  los empleados


export default route;