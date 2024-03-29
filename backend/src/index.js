// Forma actual de importar paquetes
import Express from "express";
import morgan from "morgan";
import Cors from "cors";
import connectDB from "./database.js";

connectDB();

import clientRoute from  '../src/routes/cliente.routes.js'; // Importamos las rutas para los clientes
import employeeRoute from '../src/routes/empleado.routes.js'; // Importamos las rutas para los empleados
import tSendsRoute from '../src/routes/envio.route.js'; // Importamos las rutas de los envios
import orderRoute from '../src/routes/pedido.routes.js'; // importamos las rutas para los pedidos

// asignar a una variable el funcionamiento de express
const app = Express();

// Crear el puerto  para el servidor local
app.set('port', 4000);

// asignar a morgan como dependencia de desarrollo
app.use(morgan("dev"));

// Establecer la respuesta del servidor en formato tipo JSon
app.use(Express.urlencoded( { extended: true }));
app.use(Express.json());

// Para poder recibir peticiones de diferentes fuentes
app.use(Cors({origin:'*'}));
app.use('/api', clientRoute); 
app.use('/api', employeeRoute);
app.use('/api', tSendsRoute);
app.use('/api', orderRoute)


// Función para correr el servidor
app.listen(app.get('port'), () => {
    console.log('servidor escuchando por el puerto: ', app.get('port'));
});

// Genera un apetición http de prueba.
app.use('/', (req,res) => {
    res.status(200).json({
        ok: true,
        message : 'Mi primer programa en NodeJs'
    })
});
