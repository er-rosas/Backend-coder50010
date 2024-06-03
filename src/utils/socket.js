import { productService } from "../services/index.js";
import messageModel from "../daos/mongo/models/messages.models.js";

const managerMongo = productService;

const initProductsSocket = (io) => {
    return io.on('connection', (socket) => {
            console.log("Usuario conectado al Real-Time Products");
            socket.emit('updateProducts', managerMongo.getProducts());

            socket.on("addProduct", async (data) => {
                console.log("Datos recibidos del formulario:", data);
                const newProduct = {
                    title: data.title,
                    description: data.description,
                    code: data.code,
                    price: data.price,
                    status: true,
                    stock: data.stock,
                    category: data.category,
                    //thumbnail: data.thumbnail || [],
                    thumbnails: data.thumbnails,
                    owner: data.owner
                };

                const existingCode = await managerMongo.getProductCode(data.code);
                if (existingCode) {
                    io.emit("exisitingCode", { data: data.code });
                    return "Ya existe un producto con el mismo código.";
                }

                await managerMongo.createProduct(newProduct);
                const updateProducts = await managerMongo.getProducts();
                io.emit("updateProducts", { products: updateProducts });
            });

            socket.on("deleteProduct", async (data) => {
                const pid = data.idProduct;
                await managerMongo.deleteProduct(pid);
                const updateProducts = await managerMongo.getProducts();
                io.emit("updateProducts", { products: updateProducts });
            });

            // socket.on('getMessages', async (data) => {
            //     const message = await messageModel.find();
            //     io.emit('messageLogs', message)
            // });
            
            // socket.on('message', async (data) => {
            //     await messageModel.create(data);
            
            //     const message = await messageModel.find();
            //     io.emit('messageLogs', message)
            // });
        });
}

// const initChatSocket = (io) => {
//     io.on('connection', socket => {
//         console.log("Nuevo cliente conectado");

//         socket.on('message', async (data) => {
//             console.log('Mensaje recibido:', data);
//             await messageModel.create(data);
//             const mensajes = await messageModel.find();
//             io.emit('messageLogs', mensajes);
//         });

//         socket.on('getMessages', async () => {
//             const mensajes = await messageModel.find();
//             socket.emit('messageLogs', mensajes);
//         });

//         socket.on('authenticated', (data) => {
//             socket.broadcast.emit('newUserConnected', data);
//         });

//         socket.on('disconnect', () => {
//             console.log("Cliente desconectado");
//         });
//     });
// };

const initChatSocket = (io) => {
    io.on('connection', (socket) => {
        console.log("Usuario conectado al Chat");

        socket.on('message', async (data) => {
            console.log('Mensaje recibido:', data);
            await messageModel.create(data);
            const mensajes = await messageModel.find();
            io.emit('messageLogs', mensajes);
        });

        socket.on('getMessages', async () => {
            const mensajes = await messageModel.find();
            socket.emit('messageLogs', mensajes);
        });

        socket.on('authenticated', (data) => {
            socket.broadcast.emit('newUserConnected', data);
        });

        socket.on('disconnect', () => {
            console.log("Cliente desconectado");
        });
    });
};


export {
    initProductsSocket,
    initChatSocket
}



// const { productService } = require("../services")

// initChatSocket = (io) => {        
//     const mensajes = [
//         // {user: 'Fede', message: 'Hola como están'}
//     ]
//     let connectedClients = []

//     io.on('connection', socket => {
//         // console.log('Nuevo cliente conectado')
//         connectedClients.push(socket)
//         console.log(`Cliente conectado. Total de clientes conectados: ${connectedClients.length}`)

//         socket.on('message', data => {
//             console.log('message',data)
//             mensajes.push(data)
//             io.emit('messageLogs', mensajes)
//             // persisti 
//         })

//         socket.on('authenticated', data => {
            
//             socket.broadcast.emit('newUserConnected', data)
//         })
        
//         socket.on('disconnect',()=>{
//             connectedClients = connectedClients.filter((client) => client !== socket)
//             console.log(`Cliente desconectado. Total de clientes conectados: ${connectedClients.length}`)
//         })
//     })
//}


// const initProductsSocket = (io) => {
//     let config = {
//         limit: 5,
//         page: 1,
//         sort: 1
//     }
//     return io.on('connection', async socket =>{
//         // console.log(socket)
//         // console.log('Bienvenido a realtime product')
//         const {docs} = await productService.getProducts(config)
//         // console.log(docs)
//         // const products = docs
//         socket.emit('productsList', docs )

//         socket.on('addProduct', async data =>{
//             const {title, price, thumbnail, stock, category, description} = data
//             // products.push(data)
//             const product = await productService.createProduct({
//                 title,
//                 price: parseInt(price),
//                 imageUrl: thumbnail,
//                 stock: parseInt(stock),
//                 category,
//                 description
//             })
//             // console.log(product)
//             if (!product) return console.log('Ocurrio un error al ingresar un producto')
//             const {docs} = await productService.getProducts(config)
//             // console.log(docs)
//             const products = docs
//             io.sockets.emit('productsList', products)
//         })
//     })
// }


// export default {
//     initChatSocket,
//     initProductsSocket
// }