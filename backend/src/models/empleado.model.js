import mongoose from "mongoose";
const  { Schema, model } = mongoose;

employeeSchema  = new Schema({
    Nombre: {
        type : String, 
        require : true
    },
    Telefono: {
        type : String, 
        require : true
    },
    Correo: {
        type : String, 
        require : true
    },
    Cargo: {
        type : String, 
        enum: ['Agente de ventas', 'Repartidor']
    },
    // Contraseña: {
    //     type : String,
    //     required : true 
    // }
});
export const  employeeModel = model('empleado', employeeSchema);