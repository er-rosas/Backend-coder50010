import express from "express";
import logger from 'morgan'
import handlebars from 'express-handlebars';
import { configObject } from './config/config.js';

// socket io _______________________________________________________________
import { Server as ServerIO } from 'socket.io';
import { Server as HttpServer } from 'http';
import { initProductsSocket } from "./utils/socket.js";

import appRouter from './routes/index.js'

import { __dirname } from './utils.js';
import cookieParser from "cookie-parser"
import passport from "passport"
import { initializePassport } from "./config/initializePassport.config.js";

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
app.use(logger('dev'))


app.use(cookieParser())

initializePassport()
app.use(passport.initialize())


app.use(appRouter)

// socket_______________________________________________________________
// initChatSocket(io)
initProductsSocket(io)

httpServer.listen(PORT, err =>{
    if (err) console.log(err)
    console.log(`Escuchando en el puerto: ${PORT}`);
});