import { ordersModel } from "../models/pedido.model.js";
import messages from "../utils/messages.js";
const { messageGeneral } = messages;

const  controllerPedidos = {};


/*-------------------- Métodos CRUD ---------------------------*/
 // Metodo para crar un pedido
 controllerPedidos.createOrder = async  (req, res) =>{
    try{
        const data = req.body;
        const resp = await ordersModel.create({...data,Cliente:req.Cliente,Empleado:req.Empleado,Envio:req.Envio});
        messageGeneral(res,201, true,resp,"Pedido creado"); 
    } catch ( error ){
        messageGeneral(res,500,false,"",error.message);

    }
 };


 // Método paraobtener un pedido via ID
 controllerPedidos.getOrderById = async  (req ,res)=>{
    try{
        const { id } = req.params;
        const resp = await ordersModel.findById(id);
        if(!resp){
            return messageGeneral(res,404, false,"", "Pedido no encontrado");
        }
        messageGeneral(res,200,true,resp,"");
    } catch(error){
        messageGeneral(res,500,false,"",error.message);
    }
 };


 // Método para actualizar un pedido por ID
 controllerPedidos.updateOrder = async  (req,res) =>{
    try {
        const {  id } = req.params;
        const resp = await  ordersModel.findById(id);
        if (!resp) {
            return messageGeneral(res,404, false,"", "Pedido no encontrado");
        }
        await resp.updateOne(req.body);
        messageGeneral(res,200,true,"","Pedido Actualizado");
    } catch (error) {
        messageGeneral(res,500,false,"",error.message);
    }
 };


 // Método para eliminar un pedido por ID
 controllerPedidos.deleteOrder = async (req , res )=>{
    try{
        const { id }= req.params;
        const resp  =await ordersModel.findById(id);
        if(!resp){
            return messageGeneral(res,404, false,"", "Pedido no encontrado");
        }
        await resp.deleteOne();
        messageGeneral(res,200, true , "", "Pedido Eliminado Correctamente")
    }catch(error){
        messageGeneral(res,500,false,"",error.message);
    }
 };


/*-------------------- Métodos adicionales ---------------------------*/
 // Método para obtener todos los pedidos
 controllerPedidos.getAllOrder = async  (req,res)=>{
    try{
        const  orders = await ordersModel.find();
        messageGeneral(res, 200, true, orders, "Pedidos encontrados");
    }catch (error) {
        messageGeneral(res, 500, false, "", error.message);
    }
 };

 export  default controllerPedidos;