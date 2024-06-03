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
        });
}

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