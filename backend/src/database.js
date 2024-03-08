import mongoose from "mongoose";
const URI = "mongodb://localhost/paqueteriaExpress";

// se crea la conexión
const  connectDB = async () => {
    try{
        const db=await mongoose.connect(URI);
        console.log("Conexión a mongo exitosa",
        db.connection.name);
        
    }catch (error){
        console.log('Error al conectar a MongoDB:', error) 
    };
};

export default connectDB;