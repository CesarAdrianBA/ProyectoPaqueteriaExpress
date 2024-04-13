import mongoose from "mongoose";
const  { Schema, model } = mongoose;

const clientSchema = new Schema({

    Nombre: {
        type : String, 
        require : true
    },
    Telefono: {
        type : String, 
        require : false
    },
    Correo: {
        type : String, 
        require : false
    },
    Genero: {
        type : String, 
        require : false
    },
    Edad: {
        type : Number, 
        require : false
    },
    EmpleadoAsignado: {
        type : Schema.ObjectId,
        ref: "empleado"
    },
    Contrasenia: {
        type : String,
        required : false
    }
});

export const clientModel = model('cliente', clientSchema);