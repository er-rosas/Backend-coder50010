// import __dirname from "./utils.js";

const express = require('express');
const handlebars = require('express-handlebars');
const { Server: ServerIO, Server }  = require('socket.io')


// /api/products y /api/carts de la entrega anterior
const productRouter = require('./routes/products.router.js')
const cartRouter = require('./routes/carts.router.js')

const homeRouter = require('./routes/home.router.js')
const realtimeproductsRouter = require('./routes/realTimeProducts.router.js')
const ProductManager = require('./manager/productManager.js')
const { connectDB } = require('./config/connectDB.js')

const PORT = 8080 || process.env.PORT;
const app = express();
connectDB()


app.use(express.static(__dirname + "/public"));
app.use(express.json())
app.use(express.urlencoded({extended: true}))


// Configuración de Handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)

app.use('/', homeRouter)
app.use('/realtimeproducts', realtimeproductsRouter)

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
});