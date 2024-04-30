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

// Ruta para crear un carrito
router.post('/', createCart)

// Ruta para traer un carrito
router.get('/:cid', getCartById)
// Ruta para actualizar el carrito con un arreglo de productos
router.put('/:cid', updateCart)
// Ruta para para eliminar todos los productos del carrito
router.delete('/:cid', deleteAllProductOfCart)

// Ruta para agregar un producto a un carrito por query
router.get('/:cid/product/:pid', passportCall('jwt'), authorization( ['PUBLIC', 'USER_PREMIUM', 'ADMIN'] ), addProductToCart)
// Ruta para agregar un producto a un carrito
router.post('/:cid/product/:pid', addProductToCart)
// Sin terminar
// Ruta para actualizar la cantidad de un producto en el carrito
router.put('/:cid/product/:pid', updateProductQuantityOfCart)
// Ruta para eliminar un producto del carrito
router.delete('/:cid/product/:pid', deleteOneProductOfCart)

// Esa ruta permitirá finalizar el proceso de compra de dicho carrito.
router.post('/:cid/purchase', purchaseCart)

export default router;