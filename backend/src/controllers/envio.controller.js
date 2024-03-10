import { enviosModel } from '../models/envios.model.js'
import bcrypt from  'bcrypt';
import Jwt from "jsonwebtoken";
import messages from "../utils/messages.js";
const { messageGeneral } = messages;

const  controllerEnvios = {};

/*-------------------- Métodos CRUD ---------------------------*/
 // Metodo para crear un tipo de envio
 controllerEnvios.createTSends = async  (req, res) =>{
   try{
      const data = req.body;
      const resp = await enviosModel.create(data);
      messageGeneral(res,201, true,resp,"Tipo de envío creado"); 
   } catch ( error ){
      messageGeneral(res,500,false,"",error.message);

  }
 }

 // Método paraobtener un tipo de envio via ID
 controllerEnvios.getTSendsById = async (req, res)=>{
   try{
       const { id } = req.params;
       const resp = await enviosModel.findById(id);
       if(!resp){
           return messageGeneral(res,404, false,"", "Tipo de envío no encontrado");
       }
       messageGeneral(res,200,true,resp,"");
   } catch(error){
       messageGeneral(res,500,false,"",error.message);
   }
};

  // Método para actualizar un tipo de envio por ID
  controllerEnvios.updateTSends=async (req, res)=>{
   try {
       const {  id } = req.params;
       const resp = await  enviosModel.findById(id);
       if (!resp) {
           return messageGeneral(res,404, false,"", "Tipo de envío no encontrado");
       }
       await resp.updateOne(req.body);
       messageGeneral(res,200,true,"","Tipo de envío Actualizado");
   } catch (error) {
       messageGeneral(res,500,false,"",error.message);
   }
}

   // Método para eliminar un tipo de envio por ID
   controllerEnvios.deleteTSends = async (req, res) =>{
   try{
         const { id }= req.params;
         const resp  = await enviosModel.findById(id);
         if(!resp){
            return messageGeneral(res,404, false,"", "Tipo de envío no encontrado");
         }
         await resp.deleteOne();
         messageGeneral(res,200, true , "", "Tipo de envío Eliminado Correctamente")
   }catch(error){
         messageGeneral(res,500,false,"",error.message);
   }
}

/*-------------------- Métodos adicionales ---------------------------*/
 // Método para obtener todos los tipo de envios
 controllerEnvios.getAllTSends = async (req, res) =>{
   try{
       const  TSends = await enviosModel.find();
       messageGeneral(res, 200, true, TSends, "Tipos de envío encontrados");
   }catch (error) {
       messageGeneral(res, 500, false, "", error.message);
   }
};

 export  default controllerEnvios;