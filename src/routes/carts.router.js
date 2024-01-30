import express from 'express';
import cartManagerMongo from '../daos/mongo/cartsManagerMongo.js';
import cartsModel from '../daos/models/carts.model.js'

const router = express.Router()
const cartsManagerMongo = new cartManagerMongo();

router
    .get("/:cid", async (req, res) => {
        try {
            const { cid } = req.params;
            const cart = await cartsModel.findOne({ _id: cid });
            console.log(cart.products);
            res.send({
                status: "succes",
                payload: cart,
            });
        } catch (error) {
            res.status(500).send(`Error de servidor. ${error.message}`);
        }
    })

    .post("/", async (req, res) => {
        try {
            const result = await cartsModel.create({ products: [] });
            res.send({
                status: "succes",
                payload: result,
            });
        } catch (error) {
            res.status(500).send(`Error de servidor. ${error.message}`);
        }
    })

    .post("/:cid/product/:pid", async (req, res) => {
        try {
            const { cid, pid } = req.params;
            const cart = await cartsModel.findById({ _id: cid });
            cart.products.push({ product: pid });
            let result = await cartsModel.findByIdAndUpdate({ _id: cid }, cart);
            res.send({
                status: "succes",
                payload: result,
            });
        } catch (error) {
            res.status(500).send(`Error de servidor. ${error.message}`);
        }
    });

    // get /carts/:cid 
    router.get('/carts/:cid', async (req, res) => {
        try {
            const { cid } = req.params;
            const cartId = await cartsManagerMongo.getCartById(cid);
            console.log(cartId + "1")
    
            // if (!productid) {
            //     return res.status(404).json({ message: 'Producto no encontrado' });
            // }
            // const product = productid.map((product) => ({
            //     ...product.toObject(),
            //     }));
            //     console.log(product)
            const cart = cartId.toObject();
            console.log(cart.products)
            const carrito = cart.products
            res.render("carts", { carrito });
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener el cart por ID' });
        }
    });
    //PUT api/carts/:cid 
    // Ruta para actualizar el carrito con un arreglo de productos
    router.put('/api/carts/:cid', async (req, res) => {
        const { cid } = req.params;
        const { products } = req.body;

        try {
            const updatedCart = await cartsManagerMongo.updateCart(cid, { products });
            res.json(updatedCart);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    });

    //PUT api/carts/:cid/products/:pid 
    // Ruta para actualizar la cantidad de un producto en el carrito
    router.put('/quantity/:cid/products/:pid', async (req, res) => {
        const { cid, pid } = req.params;
        const { quantity } = req.body;

        try {
            const updatedCart = await cartsManagerMongo.updateProductQuantity(cid, pid, quantity);
            res.json(updatedCart);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    });


    //DELETE api/carts/:cid
    // Ruta para eliminar todos los productos del carrito
    router.delete('/api/carts/:cid', async (req, res) => {
        const { cid } = req.params;

        try {
            await cartsManagerMongo.removeAllProductsFromCart(cid);
            res.json({ message: 'Productos eliminados del carrito correctamente' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    });


    //DELETE api/carts/:cid/products/:pid
    // Ruta para eliminar un producto del carrito
    router.delete('/borrarproducto/:cid/products/:pid', async (req, res) => {
        try {
            const { cid, pid } = req.params;
            const updatedCart = await cartsManagerMongo.removeProductFromCart(cid, pid);
            res.json(updatedCart);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    });

export default router;