import express from 'express';
import CartController from '../../controllers/carts.controller.js';
import { passportCall } from '../../middleware/pasportCall.js';
import { authorization } from '../../middleware/authentication.js';

const router = express.Router()


const {
    getCartById,
    createCart,
    addProductToCart,
    updateCart,
    updateProductQuantityOfCart,
    deleteAllProductOfCart,
    deleteOneProductOfCart,
    purchaseCart
} = new CartController();

// Ruta para traer un carrito
router.get('/:cid', getCartById)

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

// Esa ruta permitirá finalizar el proceso de compra de dicho carrito.
router.post('/:cid/purchase', purchaseCart)

export default router;