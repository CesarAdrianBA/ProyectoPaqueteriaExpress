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
        ref: 'cliente'
    },
    Empleado: {
        type: Schema.ObjectId,
        ref: 'empleado'
    },
    Envio: {
        type: Schema.ObjectId,
        ref: 'envio'
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

export const  pedidoModel = model('pedido', pedidoSchema);