import { Router } from "express";
import controllerEnvios from  '../controllers/envio.controller.js';
const route = Router();


// CRUD
route.post( '/createTSends', controllerEnvios.createTSends); // Crear un tipo de envio
route.get('/getTSendsById/:id', controllerEnvios.getTSendsById ); // Buscar un tipo de envio por ID
route.put('/updateTSends/:id', controllerEnvios.updateTSends); // Actualizar un tipo de envio por ID
route.delete("/deleteTSends/:id", controllerEnvios.deleteTSends); // Eliminar un tipo de envio por ID

//Otros metodos
route.get('/listTSends', controllerEnvios.getAllTSends);  // Listado completo de  tipos de envio

export default route;