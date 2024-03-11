import mongoose from "mongoose";
const{Schema, model} = mongoose;

const  pedidoSchema = new Schema({
    Folio:{
        type:String,
        require: true
    },
    Fecha_pedido : {
        type: Date,
        default: Date.now()
      } ,
    Cliente: {
        type: Schema.ObjectId,
        ref: 'cliente' // el valor hace referencia al ID de un usuario Cliente
    },
    Empleado: {
        type: Schema.ObjectId,
        ref: 'empleado' // El valor hace referencia al ID de un usuario Empleado
    },
    Envio: {
        type: Schema.ObjectId,
        ref: 'envio' // El valor hace referencia al ID de un Envio
    },
    Destinatario: {
        type: String,
        require: true
    },
    Direccion:{
        type: String,
        require: true
    },
    Monto: {
        type: Number,
        require: true
    },
    Pago: {
        type: Number,
        require: true
    }

},{
    timestamps:true 
});

export const  ordersModel = model('pedido', pedidoSchema);