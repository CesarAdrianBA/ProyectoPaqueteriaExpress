import { Router } from "express";
import controllerEnvios from  '../controllers/envio.controller.js';
const route = Router();


// CRUD
route.post( '/createTSends', controllerEnvios.createTSends);
route.get('/getTSendsById/:id', controllerEnvios.getTSendsById );
route.put('/updateTSends/:id', controllerEnvios.updateTSends);
route.delete("/deleteTSends/:id", controllerEnvios.deleteTSends);

//Otros metodos
route.get('/listTSends', controllerEnvios.getAllTSends);  // Listado completo de  los empleados

export default route;