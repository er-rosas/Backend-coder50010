// const express = require('express')
// // const http = require('http');
// // const path = require('path');
// // const socketIO = require('socket.io');
// // const exphbs = require('express-handlebars');
// // const socketIO = require('socket.io');
// // const exphbs = require('express-handlebars');
// // const cartRouter = require('./routes/carts.router.js')
// // const productRouter = require('./routes/products.router.js')
// // const handlebars  = require('express-handlebars')
// // const { Server: ServerIO, Server }  = require('socket.io') 

// const http = require('http');
// const handlebars = require('express-handlebars');
// const socketIO = require('socket.io');
// const path = require('path');


// const app = express()
// const PORT = 8080;

// const server = http.createServer(app);
// const io = socketIO(server);


// app.use(express.static(__dirname+'/public'))
// app.use(express.json())
// app.use(express.urlencoded({extended: true}))

// app.engine('handlebars', handlebars.engine())
// app.set('views', __dirname+'/views')
// app.set('view engine', 'handlebars')


// // app.get('/', (req,res)=>{
// //     res.render('index', {} )
// // })

// // app.use('/api/carts', cartRouter)
// // app.use('/api/products', productRouter)


// // Ruta al archivo JSON simulando la base de datos
// const dbPath = path.join(__dirname, 'product.json');

// // Función para leer los productos desde el archivo JSON
// const readProductsFromDB = () => {
// try {
//     const productsData = fs.readFileSync(dbPath);
//     return JSON.parse(productsData);
// } catch (error) {
//     console.error('Error al leer el archivo de productos:', error);
//     return [];
// }
// };

// // Función para guardar los productos en el archivo JSON
// const saveProductsToDB = (products) => {
// try {
//     fs.writeFileSync(dbPath, JSON.stringify(products, null, 2));
// } catch (error) {
//     console.error('Error al guardar los productos en el archivo:', error);
// }
// };

// let products = readProductsFromDB();


// // Ruta para la vista home con todos los productos
// app.get('/', (req, res) => {
//     res.render('home', { products });
// });

// // Ruta para la vista en tiempo real de productos
// app.get('/realtimeproducts', (req, res) => {
//     res.render('realTimeProducts', { products });
// });

// io.on('connection', (socket) => {
//     console.log('Cliente conectado');

//     // Escuchar evento 'nuevo-producto' desde el cliente
//     socket.on('nuevo-producto', (newProduct) => {
//     // Agregar el nuevo producto a la lista
//     products.push(newProduct);
//     // Emitir evento 'actualizar-productos' a todos los clientes conectados
//     io.emit('actualizar-productos', products);
//     });

//     // Escuchar evento 'eliminar-producto' desde el cliente
//     socket.on('eliminar-producto', (productId) => {
//     // Filtrar la lista de productos para eliminar el producto con el ID dado
//     products = products.filter((product) => product.id !== productId);
//     // Emitir evento 'actualizar-productos' a todos los clientes conectados
//     io.emit('actualizar-productos', products);
//     });
// });


// const httpServer = app.listen(PORT, () => {
//     console.log(`Servidor Express corriendo en el puerto ${PORT}`);
// });










// const express = require('express');
// const http = require('http');
// const socketIO = require('socket.io');
// const exphbs = require('express-handlebars');

// // const express = require('express');
// // const exphbs = require('express-handlebars');
// const fs = require('fs');

// const app = express();
// const server = http.createServer(app);
// const io = socketIO(server);

// // Configura Handlebars como motor de plantillas
// app.engine('handlebars', exphbs());
// app.set('view engine', 'handlebars');

// // Maneja las rutas
// app.get('/', (req, res) => {
//     // Lee el archivo JSON de productos
//     fs.readFile('./mockDB/products.json', 'utf8', (err, data) => {
//     if (err) {
//         console.error('Error al leer el archivo JSON:', err);
//         return res.status(500).send('Error interno del servidor');
//     }

//     const productos = JSON.parse(data); // Convierte el contenido a un objeto JavaScript

//     // Renderiza la vista home y pasa los datos de productos
//     res.render('home', { productos });
//     });
// });

// app.get('/realtimeproducts', (req, res) => {
//   res.render('realTimeProducts', { /* datos para la vista realTimeProducts */ });
// });

// // Maneja la lógica de WebSockets
// io.on('connection', (socket) => {
//   console.log('Nuevo usuario conectado');

//   socket.on('agregarProducto', (nuevoProducto) => {
//     // Lógica para agregar un nuevo producto

//     // Emitir el evento a todos los clientes conectados
//     io.emit('productoAgregado', nuevoProducto);
//   });

//   socket.on('eliminarProducto', (productoId) => {
//     // Lógica para eliminar un producto

//     // Emitir el evento a todos los clientes conectados
//     io.emit('productoEliminado', productoId);
//   });

//   socket.on('disconnect', () => {
//     console.log('Usuario desconectado');
//   });
// });

// // Inicia el servidor
// const PORT = 3000;
// server.listen(PORT, () => {
//   console.log(`Servidor en ejecución en el puerto ${PORT}`);
// });











// const express = require('express')
// // const usersRouter = require('./routes/users.router.js')
// // const cartsRouter = require('./routes/carts.router.js')
// const handlebars  = require('express-handlebars')
// const { Server: ServerIO, Server }  = require('socket.io') 

// const app = express()


// app.use(express.static(__dirname+'/public'))
// app.use(express.json())
// app.use(express.urlencoded({extended: true}))

// app.engine('handlebars', handlebars.engine())
// app.set('views', __dirname+'/views')
// app.set('view engine', 'handlebars')

// // http://localhost:8080 /
// app.get('/', (req,res)=>{
//     res.render('index', {} )
// })
// // app.use('/api/users',    usersRouter)
// // app.use('/api/carts',    cartsRouter)
// // app.use('/api/products', ()=>{})


// const httpServer =  app.listen(8080, ()=>{
//     console.log('Escuchando en el puerto 8080')
// })
// // socket del lado del server
// const io = new ServerIO(httpServer)

// let mensajes = []

// io.on('connection', socket =>{
//     console.log('cliente conectado')
//     // io.emit('')
//     socket.on('message', data => {
//         console.log(data)
//         mensajes.push(data)

//         io.emit('messageLogs', mensajes)
//     })
    
// })









const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const { Server: ServerIO, Server }  = require('socket.io')
const fs = require('fs');

// const http = require('http').createServer(app);
// const io = require('socket.io')(http);

// const usersRouter = require('./routes/users.router.js')
// const cartsRouter = require('./routes/carts.router.js')
// const homeRouter = require('./routes/home.router.js')
// const realtimeproductsRouter = require('./routes/realtimeproducts.router.js')


const productsData = fs.readFileSync('./src/mockDB/products.json', 'utf-8');
const productos = JSON.parse(productsData);


app.use(express.static(__dirname+'/public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))


// Configuración de Handlebars
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');


app.get('/', (req, res) => {
    res.render('home', { productos });
});

app.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', { productos });
});

// app.post('/add-product', (req, res) => {
//     // Obtener los datos del producto del formulario
//     const { productName } = req.body;

//     // Agregar el nuevo producto a la lista de productos
//     productos.push(productName);

//     // Emitir el evento 'addProduct' a través del socket.io al cliente
//     io.emit('addProduct', productName);

//     // Enviar una respuesta al cliente, por ejemplo, un código 200 para indicar éxito
//     res.status(200).send('Product added successfully');
// });

// app.use('/', homeRouter)
// app.use('/realtimeproducts', realtimeproductsRouter)
// app.use('/api/carts', cartRouter)
// app.use('/api/products', productRouter)



const httpServer = app.listen(8080, () => {
    console.log('Server listening on port 8080');
});

const io = new ServerIO(httpServer)

io.on('connection', (socket) => {
    console.log('Usuario conectado');
    socket.emit('updateProducts', productos);

    socket.on('addProduct', (productName) => {
    productos.push(productName);
    io.emit('updateProducts', productos);
    });
});