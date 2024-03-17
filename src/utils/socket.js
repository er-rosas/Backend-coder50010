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