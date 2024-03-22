import express from "express";
import logger from 'morgan'
import handlebars from 'express-handlebars';
// import { engine } from 'express-handlebars';
import { configObject } from './config/config.js';

// socket io _______________________________________________________________
// const {config: configObject} = require('./config/config.js')
import { Server as ServerIO } from 'socket.io';
import { Server as HttpServer } from 'http';
import { initProductsSocket } from "./utils/socket.js";

// const { Server: HttpServer } = require('http')
// const { Server: ServerIo } = require('socket.io')
// const { initChatSocket, initProductsSocket } = require('./utils/socket.js')
// import { initChatSocket, initProductsSocket } from './utils/socket.js';

import appRouter from './routes/index.js'
// import appRouter from './routes'


// import ProductManagerMongo from './daos/mongo/productsDao.mongo.js';
// import messageModel from './daos/mongo/models/messages.models.js';

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
// app.set('views', viewsDir);

// app.engine('hbs', engine({
//     extname:'.hbs'
// }))
// app.set('view engine', 'hbs')
// app.set('views', __dirname+'views')


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

// const initServer = async () => {
//     return await httpServer.listen(PORT, err =>{
//         if (err)  console.log(err)
//         logger.info(`Escuchando en el puerto ${PORT}`)
//     })
// }

httpServer.listen(PORT, err =>{
            if (err) console.log(err)
            console.log(`Escuchando en el puerto: ${PORT}`);
        })

// export default initServer

// const httpServer = app.listen(PORT, (err) => {
//     if (err) console.log(err);
//     console.log(`Escuchando en el puerto ${PORT}:`);
// });

// const io = new ServerIO(httpServer)

// const managerMongo = new ProductManagerMongo();

// io.on('connection', (socket) => {
//     console.log("Usuario conectado.");
//     socket.emit('updateProducts', managerMongo.getProducts());

//     socket.on("addProduct", async (data) => {
//         const newProduct = {
//             title: data.title,
//             description: data.description,
//             code: data.code,
//             price: data.price,
//             status: true,
//             stock: data.stock,
//             category: data.category,
//             thumbnail: data.thumbnail || [],
//         };

//         const existingCode = await managerMongo.getProductCode(data.code);
//         if (existingCode) {
//             io.emit("exisitingCode", { data: data.code });
//             return "Ya existe un producto con el mismo código.";
//         }

//         await managerMongo.createProduct(newProduct);
//         const updateProducts = await managerMongo.getProducts();
//         io.emit("updateProducts", { products: updateProducts });
//     });

//     socket.on("deleteProduct", async (data) => {
//         const pid = data.idProduct;
//         await managerMongo.deleteProduct(pid);
//         const updateProducts = await managerMongo.getProducts();
//         io.emit("updateProducts", { products: updateProducts });
//     });

//     socket.on('getMessages', async (data) => {
//         const message = await messageModel.find();
//         io.emit('messageLogs', message)
//     });
    
//     socket.on('message', async (data) => {
//         await messageModel.create(data);
    
//         const message = await messageModel.find();
//         io.emit('messageLogs', message)
//     });
// });