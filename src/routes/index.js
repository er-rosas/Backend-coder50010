import { Router } from 'express'
// Importacion nombrada
// import { usersRouter } from './users.router.js'
// Importacion por default
import homeRouter from './home.router.js';
import realtimeproductsRouter from './realTimeProducts.router.js';
import multerRouter from './multer.router.js'
import messaggesRouter from './messages.router.js'

import productRouter from './products.router.js';
import cartRouter from './carts.router.js';

import usersRouter from './users.router.js'

import productDetail from './productDetail.router.js'

const router = Router()

router.use('/', homeRouter)
router.use('/realtimeproducts', realtimeproductsRouter)
router.use('/multer', multerRouter)
router.use('/messages', messaggesRouter)

router.use('/api/users', usersRouter)
router.use('/api/products', productRouter)
router.use('/api/carts', cartRouter)

router.use('/productdetail', productDetail)

export default router