import express from "express";
//import logger from 'morgan'
import handlebars from 'express-handlebars';
import { configObject } from './config/config.js';

// socket io _______________________________________________________________
import { Server as ServerIO } from 'socket.io';
import { Server as HttpServer } from 'http';
import { initProductsSocket, initChatSocket } from "./utils/socket.js";

import appRouter from './routes/index.js'

import { __dirname } from './utils/dirname.js';
import cookieParser from "cookie-parser"
import passport from "passport"
import { initializePassport } from "./config/initializePassport.config.js";
import { addLogger, logger } from "./utils/logger.js";

//Documentacion
import swaggerJsDocs from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";

// Server
const app = express();
const httpServer = new HttpServer(app)
const io = new ServerIO(httpServer)
const PORT = configObject.port;
// connectDB()

// Configuración de Handlebars
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');


// Middlewares
// Configuración para enviar por body
app.use(express.static(__dirname + "/public"));
app.use(express.json())
app.use(express.urlencoded({extended: true}))



app.use(cookieParser())

initializePassport()
app.use(passport.initialize())
app.use(addLogger)

// sweagger config -> documentación
const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Documentación de app SmartStore',
            description: 'Descripción de nuestra app SmartStore',
            version: '1.0.0'
        },
        servers: [
            {
                url: 'http://localhost:8000',
                description: 'Servidor Local de producción'
            }
        ]
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
} 

const specs = swaggerJsDocs(swaggerOptions)
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

app.use(appRouter)

// socket_______________________________________________________________
initProductsSocket(io);
initChatSocket(io);

httpServer.listen(PORT, err =>{
    if (err) console.log(err)
    logger.info(`Escuchando en el puerto: ${PORT}`);
});