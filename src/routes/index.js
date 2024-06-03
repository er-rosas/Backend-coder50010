import express from "express"

import viewsRouter from './views.router.js';
import sessionsRouter from './apis/sessions.router.js';
import usersRouter from './apis/users.router.js';

import productsRouter from './apis/products.router.js';

import cartsRouter from './apis/carts.router.js';
import ordersRouter from './apis/orders.router.js'
import realtimeproductsRouter from './apis/realTimeProducts.router.js';

import pruebasRouter from './apis/pruebas.router.js';
import { errorHandler } from "../middleware/error/index.js";

const router = express.Router()


router.use('/', viewsRouter)
router.use('/api/sessions', sessionsRouter)
router.use('/api/users', usersRouter)

router.use('/api/products', productsRouter)

router.use('/api/carts', cartsRouter)
router.use('/api/orders', ordersRouter)
router.use('/api/realtimeproducts', realtimeproductsRouter)

router.use('/api/pruebas', pruebasRouter)


router.use('*', async (req, res)=>{
    res.status(404).json({
        mensaje: 'ruta no encontrada'
    })
});


router.use(errorHandler)

export default router