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
        enum: ['Administrador', 'Agente de ventas', 'Repartidor'], // Aqui solo se pueden utilizar valores que se encuentren en esta lista.
        require: true
    },
    Contrasenia: {
        type : String,
        required : true 
    }
});
export const  employeeModel = model('empleado', employeeSchema);