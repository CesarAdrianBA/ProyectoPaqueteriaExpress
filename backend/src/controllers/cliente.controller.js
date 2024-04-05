import { clientModel } from "../models/cliente.model.js";
import bcrypt from 'bcrypt';
import Jwt from "jsonwebtoken";
import messages from "../utils/messages.js";
const { messageGeneral } = messages;

const  controllerClientes = {};

// Método para crear un cliente
controllerClientes.createClient = async(req, res) =>{
    try{
        const data = req.body;
        const resp = await clientModel.create(data);
        messageGeneral(res,201, true,resp,"Cliente creado"); 
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

// Método para obtener todos los clientes
controllerClientes.getAllClients = async (req, res) => {
    try {
        const clients = await clientModel.find();
        messageGeneral(res, 200, true, clients, "Clientes encontrados");
    } catch (error) {
        messageGeneral(res, 500, false, "", error.message);
    }
};

// Método para obtener todos los clientes por empleado
controllerClientes.getAllClientsEmployees = async (req, res) =>{
    try{
        const  clients = await clientModel.find({EmpleadoAsignado: req.userid }).populate({
            path:"EmpleadoAsignado",
            select: 'Nombre Cargo'
        });
        messageGeneral(res, 200, true, clients, "Clientes encontrados "+ req.userid);
    }catch (error) {
        messageGeneral(res, 500, false, "", error.message);
    }
 };

// Método para hacer login de cliente
controllerClientes.loginClient = async (req, res) => {
    try {
        const data = req.body;

        const resp = await clientModel.findOne({ Correo: data.Correo });

        // Si correo no existe en la BD devuelvo mensaje de error
        if (!resp) {
            return messageGeneral(res, 400, false, "", 'Correo no existe');
        }

        // Verificando contraseñas
        const match = await bcrypt.compare(data.Contrasenia, resp.Contrasenia);

        if (!match) {
            const token = Jwt.sign({ Id: resp._id }, "secreta");
            return messageGeneral(res, 200, true, { ...resp._doc, password: null, token }, "Bienvenido!!!");
        }

        messageGeneral(res, 400, false, "", "Contraseña incorrecta!!!");
    } catch (error) {
        messageGeneral(res, 500, false, "", error.message);
    }
}




export default  controllerClientes;