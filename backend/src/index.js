import { Express } from "express";
import morgan from "morgan";
import Cors from "cors";
import connectDB from "./database";

connectDB();

// Aqui van las rutas  de la API. si tuviera alguna :c


// Asignar a una variable el funcionamiento de express
const app = Express ;

// Crear el puerto para el servidor
app.set('port', 4000);

// Asignar a morgan como dependencia de desarrollo
app.use(morgan("dev"));

// Establecer la respuesta del servidor en formato tipo JSon
app.use(Express.urlencoded({ extended : true }));
app.use(Express.json());

// Para poder recibir peticiones de difernetes fuentes
app.use(Cors({origin:'*'}));

// Función para correr el servidor
app.listen(app.get('port'), () =>{
    console.log(`Server on port ${app.get('port')}`);
});

// Genera una petición http de prueba
app.use('/', (req,res) => {
    res.status(200).json({
        ok: true,
        message : 'Mi primer programa en NodeJs'
    })
});