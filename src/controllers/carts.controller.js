import CartManagerMongo from "../daos/mongo/cartsManagerMongo.js";

class CartController{
    constructor(){
        this.service = new CartManagerMongo()
    };
    getCartById = async (req, res) => {
        try {
            const { cid } = req.params;
            const cart = await this.service.getCartById(cid);
            console.log(cart.products);
            const cartId = await this.service.getCartById(cid);
            const cartObject = cartId.toObject();
            const carrito = cartObject.products
            res.render("carts", { carrito });
    
        } catch (error) {
            res.status(500).send(`Error de servidor. ${error.message}`);
        }
    };
    createCart = async (req, res) => {
        try {
            const result = await this.service.createCart({ products: [] });
            res.send({
                status: "succes",
                payload: result,
            });
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
    
            const cart = await this.service.getCartById({ _id: cid });
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
        const { cid } = req.params;
        const { products } = req.body;
    
        try {
            const updatedCart = await this.service.updateCart(cid, { products });
            res.json(updatedCart);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
    updateProductQuantityOfCart = async (req, res) => {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
    
        try {
            const updatedCart = await this.service.updateProductQuantity(cid, pid, quantity);
            res.json(updatedCart);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
    deleteAllProductOfCart = async (req, res) => {
        const { cid } = req.params;
    
        try {
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
};

export default CartController;