import { employeeModel } from "../models/empleado.model.js";
import bcrypt from  'bcrypt';
import Jwt from "jsonwebtoken";
import messages from "../utils/messages.js";
const { messageGeneral } = messages;

const  controllerEmpleados = {};

/*-------------------- Métodos CRUD ---------------------------*/
 // Metodo para crar un empleado

 controllerEmpleados.createEmployee  = async (req, res) =>{
    try{
        const data = req.body;
        const resp = await employeeModel.create(data);
        messageGeneral(res,201, true,resp,"Empleado creado"); 
    } catch ( error ){
        messageGeneral(res,500,false,"",error.message);

    }
 }

 // Método paraobtener un empleado via ID

 controllerEmpleados.getEmployeeById = async (req, res)=>{
    try{
        const { id } = req.params;
        const resp = await employeeModel.findById(id);
        if(!resp){
            return messageGeneral(res,404, false,"", "Empleado no encontrado");
        }
        messageGeneral(res,200,true,resp,"");
    } catch(error){
        messageGeneral(res,500,false,"",error.message);
    }
 };

 // Método para actualizar un empleado por ID

 controllerEmpleados.updateEmployee=async (req, res)=>{
    try {
        const {  id } = req.params;
        const resp = await  employeeModel.findById(id);
        if (!resp) {
            return messageGeneral(res,404, false,"", "Empleado no encontrado");
        }
        await resp.updateOne(req.body);
        messageGeneral(res,200,true,"","Empleado Actualizado");
    } catch (error) {
        messageGeneral(res,500,false,"",error.message);
    }
 }

 // Método para eliminar un empleado por ID
 controllerEmpleados.deleteEmployee = async (req, res) =>{
    try{
        const { id }= req.params;
        const resp  =await employeeModel.findById(id);
        if(!resp){
            return messageGeneral(res,404, false,"", "Empleado no encontrado");
        }
        await resp.deleteOne();
        messageGeneral(res,200, true , "", "Empleado Eliminado Correctamente")
    }catch(error){
        messageGeneral(res,500,false,"",error.message);
    }
}

/*-------------------- Métodos adicionales ---------------------------*/
 // Método para obtener todos los empleados
 controllerEmpleados.getAllEmployee = async (req, res) =>{
    try{
        const  employees = await employeeModel.find();
        messageGeneral(res, 200, true, employees, "Empleados encontrados");
    }catch (error) {
        messageGeneral(res, 500, false, "", error.message);
    }
 };

 // Método para hacer login de empleado
 controllerEmpleados.loginEmployee = async (req, res)=>{
    try{
        const data = req.body;

        const resp = await  employeeModel.findOne({Correo:data.Correo});
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
    } catch (error){
        messageGeneral(res, 500, false, "", error.message);
    }
 }


 export  default controllerEmpleados;