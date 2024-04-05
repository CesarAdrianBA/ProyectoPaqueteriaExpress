import mongoose from "mongoose";
const  { Schema, model } = mongoose;

const clientSchema = new Schema({

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
    Genero: {
        type : String, 
        require : true
    },
    Edad: {
        type : Number, 
        require : true
    },
    EmpleadoAsignado: {
        type : Schema.ObjectId,
        ref: "empleado"
    },
    Contrasenia: {
        type : String,
        required : true
    }

});

export const clientModel = model('cliente', clientSchema);