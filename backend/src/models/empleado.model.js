import mongoose from "mongoose";
const  { Schema, model } = mongoose;

const employeeSchema  = new Schema({
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
        enum: ['Agente de ventas', 'Repartidor'],
        require: true
    },
    Contrasenia: {
        type : String,
        required : true 
    }
});
export const  employeeModel = model('empleado', employeeSchema);