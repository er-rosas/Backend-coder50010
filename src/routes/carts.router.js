import express from 'express';
import CartManagerMongo from '../daos/mongo/cartsManagerMongo.js';
import cartsModel from '../daos/models/carts.model.js'
import CartController from '../controllers/carts.controller.js';
import { passportCall } from '../middleware/pasportCall.js';
import { authorization } from '../middleware/authentication.js';

const router = express.Router()

const cartsManagerMongo = new CartManagerMongo();

const {
    getCartById,
    createCart,
    addProductToCart,
    updateCart,
    updateProductQuantityOfCart,
    deleteAllProductOfCart,
    deleteOneProductOfCart
} = new CartController();

// Ruta para traer un carrito
router.get('/:cid', passportCall('jwt'), authorization( ['PUBLIC', 'USER_PREMIUM', 'ADMIN'] ), getCartById)

// Ruta para crear un carrito
router.post('/', createCart)

// Ruta para agregar un producto a un carrito
router.post('/:cid/product/:pid', addProductToCart)

// Ruta para agregar un producto a un carrito por query
router.get('/:cid/product/:pid', passportCall('jwt'), authorization( ['PUBLIC', 'USER_PREMIUM', 'ADMIN'] ), addProductToCart)

// Ruta para actualizar el carrito con un arreglo de productos
router.put('/:cid', updateCart)

// Sin terminar
// Ruta para actualizar la cantidad de un producto en el carrito
router.put('/:cid/products/:pid', updateProductQuantityOfCart)

// Ruta para para eliminar todos los productos del carrito
router.delete('/:cid', deleteAllProductOfCart)

// Ruta para eliminar un producto del carrito
router.delete('/:cid/products/:pid', deleteOneProductOfCart)

// router.get("/:cid", async (req, res) => {
//     try {
//         const { cid } = req.params;
//         const cart = await cartsManagerMongo.getCartById(cid);
//         console.log(cart.products);
//         const cartId = await cartsManagerMongo.getCartById(cid);
//         const cartObject = cartId.toObject();
//         const carrito = cartObject.products
//         res.render("carts", { carrito });

//     } catch (error) {
//         res.status(500).send(`Error de servidor. ${error.message}`);
//     }
// });

// router.post("/", async (req, res) => {
//     try {
//         const result = await cartsModel.create({ products: [] });
//         res.send({
//             status: "succes",
//             payload: result,
//         });
//     } catch (error) {
//         res.status(500).send(`Error de servidor. ${error.message}`);
//     }
// });

// Agregar un producto a un carrito
// router.post("/:cid/product/:pid", async (req, res) => {
//     try {
//         const { cid, pid } = req.params;

//         const { quantity } = req.body;

//         // Verificar si la cantidad es un número positivo
//         if (!Number.isInteger(quantity) || quantity <= 0) {
//             return res.status(400).send("La cantidad debe ser un número entero positivo.");
//         }

//         const cart = await cartsModel.findById({ _id: cid });
//         cart.products.push({ product: pid, quantity  });

//         let result = await cartsModel.findByIdAndUpdate({ _id: cid }, cart);
//         res.send({
//             status: "succes",
//             payload: result,
//         });
//     } catch (error) {
//         res.status(500).send(`Error de servidor. ${error.message}`);
//     }
// });

//Agregar un producto a un carrito por query
// router.get("/:cid/product/:pid", async (req, res) => {
//     try {
//         const { cid, pid } = req.params;

//         const cart = await cartsModel.findById({ _id: cid });
//         cart.products.push({ product: pid   }); //quantity

//         let result = await cartsModel.findByIdAndUpdate({ _id: cid }, cart);

//         res.redirect('/api/carts/65b830c5d2b1935598426a25');
//     } catch (error) {
//         res.status(500).send(`Error de servidor. ${error.message}`);
//     }
// });

// Ruta para actualizar el carrito con un arreglo de productos
// router.put('/:cid', async (req, res) => {
//     const { cid } = req.params;
//     const { products } = req.body;

//     try {
//         const updatedCart = await cartsManagerMongo.updateCart(cid, { products });
//         res.json(updatedCart);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// });

// // Ruta para actualizar la cantidad de un producto en el carrito
// router.put('/:cid/products/:pid', async (req, res) => {
//     const { cid, pid } = req.params;
//     const { quantity } = req.body;

//     try {
//         const updatedCart = await cartsManagerMongo.updateProductQuantity(cid, pid, quantity);
//         res.json(updatedCart);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// });

// // Ruta para eliminar todos los productos del carrito
// router.delete('/:cid', async (req, res) => {
//     const { cid } = req.params;

//     try {
//         await cartsManagerMongo.removeAllProductsFromCart(cid);
//         res.json({ message: 'Productos eliminados del carrito correctamente' });
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// });

// Ruta para eliminar un producto del carrito
// router.delete('/:cid/products/:pid', async (req, res) => {
//     try {
//         const { cid, pid } = req.params;
//         const updatedCart = await cartsManagerMongo.removeProductFromCart(cid, pid);
//         res.json(updatedCart);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// });

export default router;