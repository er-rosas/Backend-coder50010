import CartManagerMongo from "../daos/mongo/carts.mongo.js";

class CartController{
    constructor(){
        this.service = new CartManagerMongo()
    };
    createCart = async (req, res) => {
        try {
            const result = await this.service.create({ products: [] });
            res.send({
                status: "succes",
                payload: result,
            });
        } catch (error) {
            res.status(500).send(`Error de servidor. ${error.message}`);
        }
    };
    getCartById = async (req, res) => {
        try {
            const { cid } = req.params;
            const cart = await this.service.getById(cid);
            console.log(cart.products);
            const cartId = await this.service.getById(cid);
            const cartObject = cartId.toObject();
            const carrito = cartObject.products
            res.render("carts", { carrito });
    
        } catch (error) {
            res.status(500).send(`Error de servidor. ${error.message}`);
        }
    };
    addProductToCart = async (req, res) => {
        try {
            const { cid, pid } = req.params;
            
            // Antes era const
            let { quantity } = req.body;
            
            // De esta forma si no hay quantity se añade 1
            if (quantity === undefined) {
                quantity = 1;
            }
    
            // Verificar si la cantidad es un número positivo
            if (!Number.isInteger(quantity) || quantity <= 0) {
                return res.status(400).send("La cantidad debe ser un número entero positivo.");
            }
    
            const cart = await this.service.getById({ _id: cid });
            cart.products.push({ product: pid, quantity });
    
            let result = await this.service.updateCart({ _id: cid }, cart);
            res.send({
                status: "succes",
                payload: result,
            });
            const userData = req.user;
            // console.log(userData);
            res.redirect(`/api/carts/${userData.cartId}`);
        } catch (error) {
            res.status(500).send(`Error de servidor. ${error.message}`);
        }
    };
    updateCart = async (req, res) => {
        try {
            const { cid } = req.params;
            const { products } = req.body;

            const updatedCart = await this.service.updateCart(cid, { products });
            res.json(updatedCart);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
    updateProductQuantityOfCart = async (req, res) => {
        try {
            const { cid, pid } = req.params;
            const { quantity } = req.body;
        
            const updatedCart = await this.service.updateProductQuantity(cid, pid, quantity);
            res.json(updatedCart);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
    deleteAllProductOfCart = async (req, res) => {
        try {
            const { cid } = req.params;
        
            await this.service.removeAllProductsFromCart(cid);
            res.json({ message: 'Productos eliminados del carrito correctamente' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
    deleteOneProductOfCart = async (req, res) => {
        try {
            const { cid, pid } = req.params;
            const updatedCart = await this.service.removeProductFromCart(cid, pid);
            res.json(updatedCart);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
    purchaseCart = async (req, res) => {
        try {
            //         const cart = await this.service.getById(cid).populate('products.product');
            //         const productsToPurchase = cart.products;
            
            //         // Array para almacenar los IDs de los productos que no se pudieron comprar
    //         const failedProducts = [];
    
    //         // Verificar el stock y realizar la compra para cada producto en el carrito
    //         for (const item of productsToPurchase) {
    //             const product = item.product;
    //             const quantityToPurchase = item.quantity;
    
    //             // Verificar si hay suficiente stock
    //             if (product.stock >= quantityToPurchase) {
    //                 // Restar la cantidad comprada del stock del producto
    //                 product.stock -= quantityToPurchase;
    //                 await product.save();
    
    //                 // Generar un ticket con los datos de la compra
    //                 await Ticket.create({
        //                     code: 1, // Generar un código único para el ticket
    //                     // purchase_datetime: new Date(),
    //                     amount: product.price * quantityToPurchase,
    //                     purchaser: req.user.email // Suponiendo que tienes un middleware para autenticación y req.user contiene la información del usuario
    //                 });
    
    //                 // Eliminar el producto del carrito
    //                 cart.products = cart.products.filter(prod => prod.product !== product._id);
    //             } else {
    //                 // Si no hay suficiente stock, agregar el ID del producto a failedProducts
    //                 failedProducts.push(product._id);
    //             }
    //         }
    
    //         // Guardar los cambios en el carrito
    //         await cart.save();
    
    //         res.send({
    //             status: 'success',
    //             failedProducts: failedProducts // Devolver los IDs de los productos que no se pudieron comprar
    //         });
    //     } catch (error) {
    //         res.status(400).json({ error: error.message });
    //     }
    // };
    
        const { cid } = req.params;
        const cart = await this.service.getById(cid);

        if (!cart) {
            return res.status(404).json({ error: "Carrito no encontrado" });
        }
    
            const productsToPurchase = cart.products;
            const failedProducts = [];
            
            for (const item of productsToPurchase) {
                const product = item.product;
                const quantityToPurchase = item.quantity;

                if (product.stock >= quantityToPurchase) {
                    product.stock -= quantityToPurchase;
                    await product.save();

                    const code = 13 // Generar un código único para el ticket
                    const amount = product.price * quantityToPurchase
                    const purchaser = 'a@gmail.com'
                    await this.service.createTicket(
                        code,
                        // purchase_datetime //  new Date() // O la fecha de compra que corresponda
                        amount,
                        purchaser
                    );

                    cart.products = cart.products.filter(prod => prod.product !== product._id);
                } else {
                    failedProducts.push(product._id);
                }
            }

            await cart.save();
            // await this.service.removeAllProductsFromCart(cid);

            res.json({
                status: 'success',
                failedProducts: failedProducts
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
    
    // Función para generar un código único para el ticket (puedes ajustarla según tus necesidades)
    // function generateUniqueCode() {
    //     return Math.random().toString(36).substr(2, 9);
    // }
};

export default CartController;