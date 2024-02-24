import express from "express";
import logger from 'morgan'
import handlebars from 'express-handlebars'
import { __dirname, uploader } from "./utils.js";
import { Server as ServerIO, Server } from 'socket.io';

import {configObject, connectDB} from './config/connectDB.js';
import appRouter from './routes/index.js'



import ProductManagerMongo from './daos/mongo/productsManagerMongo.js';
import messageModel from './daos/models/messages.models.js';

import cookieParser from "cookie-parser"
import passport from "passport"
import { initializePassport } from "./config/initializePassport.config.js";

// Server
const PORT = configObject.port;
const app = express();
connectDB()

// Middlewares
// Configuración para enviar por body
app.use(express.static(__dirname + "/public"));
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(logger('dev'))



app.use(cookieParser())

initializePassport()
app.use(passport.initialize())


// Configuración de Handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(appRouter)

const httpServer = app.listen(PORT, (err) => {
    if (err) console.log(err);
    console.log(`Escuchando en el puerto ${PORT}:`);
});

const io = new ServerIO(httpServer)

const managerMongo = new ProductManagerMongo();

io.on('connection', (socket) => {
    console.log("Usuario conectado.");
    socket.emit('updateProducts', managerMongo.getProducts());

    socket.on("addProduct", async (data) => {
        const newProduct = {
            title: data.title,
            description: data.description,
            code: data.code,
            price: data.price,
            status: true,
            stock: data.stock,
            category: data.category,
            thumbnail: data.thumbnail || [],
        };

        const existingCode = await managerMongo.getProductCode(data.code);
        if (existingCode) {
            io.emit("exisitingCode", { data: data.code });
            return "Ya existe un producto con el mismo código.";
        }

        await managerMongo.createproduct(newProduct);
        const updateProducts = await managerMongo.getProducts();
        io.emit("updateProducts", { products: updateProducts });
    });

    socket.on("deleteProduct", async (data) => {
        const pid = data.idProduct;
        await managerMongo.deleteProduct(pid);
        const updateProducts = await managerMongo.getProducts();
        io.emit("updateProducts", { products: updateProducts });
    });

    socket.on('getMessages', async (data) => {
        const message = await messageModel.find();
        io.emit('messageLogs', message)
    });
    
    socket.on('message', async (data) => {
        await messageModel.create(data);
    
        const message = await messageModel.find();
        io.emit('messageLogs', message)
    });
});