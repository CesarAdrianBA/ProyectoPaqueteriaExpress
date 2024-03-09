import mongoose from "mongoose";
const  { Schema, model } = mongoose;

const enviosSchema = new Schema({
    Tipo: {
        type:String,
        require: true
    },
    Costo: {
        type:Number,
        require: true
    },
});

export const  enviosModel = model("envio", enviosSchema);