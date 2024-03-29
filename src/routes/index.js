import express from "express"

import viewsRouter from './views.router.js';
import sessionsRouter from './apis/sessions.router.js';
import usersRouter from './apis/users.router.js';

import productsRouter from './apis/products.router.js';
import productDetail from './apis/productDetail.router.js';
import cartsRouter from './apis/carts.router.js';
import ordersRouter from './apis/orders.router.js'
import realtimeproductsRouter from './apis/realTimeProducts.router.js';

import multerRouter from './apis/multer.router.js';
import messaggesRouter from './apis/messages.router.js';
import pruebasRouter from './apis/pruebas.router.js';
import { errorHandler } from "../middleware/error/index.js";
import CustomError from "../utils/errors/customError.js";

const router = express.Router()
// const router = express.Router()

router.use('/', viewsRouter)
router.use('/api/sessions', sessionsRouter)
router.use('/api/users', usersRouter)

router.use('/api/products', productsRouter)
router.use('/api/productdetail', productDetail)
router.use('/api/carts', cartsRouter)
router.use('/api/orders', ordersRouter)
router.use('/api/realtimeproducts', realtimeproductsRouter)

router.use('/api/pruebas', pruebasRouter)
router.use('/api/messages', messaggesRouter)
router.use('/api/multer', multerRouter)

router.use('*', async (req, res)=>{
    res.status(404).json({
        mensaje: 'ruta no encontrada'
    })
});

router.use(errorHandler)

export default router