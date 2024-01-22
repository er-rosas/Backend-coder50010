import { Router } from 'express'
// Importacion nombrada
import { usersRouter } from './users.router.js'
// Importacion por default
import homeRouter from './home.router.js';
import realtimeproductsRouter from './realTimeProducts.router.js';
import viewsRouter from './views.router.js'
import messaggesRouter from './messages.router.js'

import productRouter from './products.router.js';
import cartRouter from './carts.router.js';

const router = Router()

router.use('/', homeRouter)
router.use('/realtimeproducts', realtimeproductsRouter)
router.use('/views', viewsRouter)
router.use('/messages', messaggesRouter)

router.use('/api/users', usersRouter)
router.use('/api/products', productRouter)
router.use('/api/carts', cartRouter)

export default router