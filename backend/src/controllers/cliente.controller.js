import { clientModel } from "../models/cliente.model.js";
import bcrypt from 'bcrypt';
import Jwt from "jsonwebtoken";
import messages from "../utils/messages.js";
const { messageGeneral } = messages;
// utils message
// Pendiente

const  controllerClientes = {};

// Método para crear un cliente
controllerClientes.createClient = async(req, res) =>{
    try{
        const data = req.body;
        const resp = await clientModel.create(data);
        messageGeneral(res,201, true,resp,"Empleado creado"); 
    } catch {
        messageGeneral(res,500,false,"",error.message);
    }
}

// Método para obtener un cliente via ID
controllerClientes.getClientById = async (req, res)=>{
    try{
        const { id }= req.params;
        const resp  =await clientModel.findById(id);
        if(!resp){
            return messageGeneral(res,404, false,"", "Cliente no encontrado");
        }
        messageGeneral(res,200,true,resp,"");
    } catch(error) {
        messageGeneral(res,500,false,"",error.message);
    }
};

// método para actualizar los datos de un cliente por id
controllerClientes.updateClient = async (req, res) =>{
    try{
        const { id }= req.params;
        const resp  =await clientModel.findById(id);
        if(!resp){
            return messageGeneral(res,404, false,"", "Cliente no encontrado");
        }
        await resp.updateOne(req.body);
        messageGeneral(res,200,true,"","Cliente Actualizado");
    } catch(error) {
        messageGeneral(res,500,false,"",error.message);
    }
}

// Método para  eliminar un cliente
controllerClientes.deleteClient = async (req, res) =>{
    try{
        const { id }= req.params;
        const resp  =await clientModel.findById(id);
        if(!resp){
            return messageGeneral(res,404, false,"", "Cliente no encontrado");
        }
        await resp.deleteOne();
        messageGeneral(res,200, true , "", "Cliente Eliminado Correctamente")
    }catch(error){
        messageGeneral(res,500,false,"",error.message);
    }
}

export default  controllerClientes;