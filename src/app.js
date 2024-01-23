import express from "express";
import logger from 'morgan'
import handlebars from 'express-handlebars'
import { __dirname, uploader } from "./utils.js";
import { Server as ServerIO, Server } from 'socket.io';

// /api/products y /api/carts de la entrega anterior
// import productRouter from './routes/products.router.js';
// import cartRouter from './routes/carts.router.js';

// import homeRouter from './routes/home.router.js';
// import realtimeproductsRouter from './routes/realTimeProducts.router.js';
import ProductManager from './daos/file/productManager.js';
import { connectDB } from './config/connectDB.js';
import appRouter from './routes/index.js'

// Server
const PORT = 8080 || process.env.PORT;
const app = express();
connectDB()

// Configuración para enviar por body

app.use(express.static(__dirname + "/public"));
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(logger('dev'))


// Configuración de Handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(appRouter)



// app.use('/api/products', productRouter)
// app.use('/api/carts', cartRouter)

// app.use('/', homeRouter)
// app.use('/realtimeproducts', realtimeproductsRouter)

const httpServer = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

const io = new ServerIO(httpServer)
const productManager = new ProductManager();

io.on('connection', (socket) => {
    console.log('Usuario conectado');
    socket.emit('updateProducts', productManager.getProducts());
    
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
        await productManager.addProduct(newProduct);
        const updatedProducts = await productManager.getProducts();
        io.emit("updateProducts", updatedProducts);
    });

    socket.on("deleteProduct", async (data) => {
        const idProduct = data.idProduct;
        await productManager.deleteProduct(parseInt(idProduct));
        const updatedProducts = await productManager.getProducts();
        io.emit("updateProducts", updatedProducts);
    });

    socket.on('getMessages', async(data) => {
        const message = await messageModel.find();
        io.emit('messageLogs', message)
    })
    
    socket.on('message', async (data) => {
        await messageModel.create(data);
    
        const message = await messageModel.find();
        io.emit('messageLogs', message)
    })
});