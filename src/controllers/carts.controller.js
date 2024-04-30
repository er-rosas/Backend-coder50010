import { cartService } from "../services/index.js";

class CartController{
    constructor(){
        this.service = cartService
        // this.service = new CartManagerMongo()
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
    getCartById = async (req, res) => {
        try {
            const { cid } = req.params;
            const cart = await this.service.getCart(cid);
            console.log(cart);
            console.log(cart.products);
            const cartId = await this.service.getCart(cid);
            const cartObject = cartId.toObject();
            const carrito = cartObject.products
            res.render("carts", { carrito });
    
        } catch (error) {
            res.status(500).send(`Error de servidor. ${error.message}`);
        }
    };

    addProductToCart = async (req, res) => {
        try {
            const { cid, pid } = req.params
            const quantity = 1
            const product = { id: pid, quantity }
            console.log('cart controller: ',product)
            console.log('cart controller cid: ',cid)
            console.log('cart controller pid: ',pid)
            const resp = await cartService.addProductToCart(cid, product)
            if (!resp) return res.status(404).json({status: 'error', message: 'Cart not found'})
            // res.status(200).redirect(`/carts/${req.user._id}`);
            res.status(200).json({
                status: 'success', 
                message: 'Product added to cart',
                payload: resp
            });
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
        
            await this.service.removeAllProducts(cid);
            res.json({ message: 'Productos eliminados del carrito correctamente' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
    deleteOneProductOfCart = async (req, res) => {
        try {
            const { cid, pid } = req.params;
            const updatedCart = await this.service.deleteProductFromCart(cid, pid);
            res.json(updatedCart);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
    purchaseCart = async (req, res) => {
        // agregar algo relacionado con el purchace del carrito
        try {
            res.json({
                status: 'success',
                failedProducts: failedProducts
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
};

export default CartController;