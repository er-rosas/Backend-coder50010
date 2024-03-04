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

import pruebasRouter from './apis/pruebas.router.js'
import sessionsRouter from './apis/sessions.router.js';

const router = Router()

router.use('/links', homeRouter)
router.use('/realtimeproducts', realtimeproductsRouter)
router.use('/multer', multerRouter)
router.use('/messages', messaggesRouter)

router.use('/api/sessions', sessionsRouter)
router.use('/api/users', usersRouter)
router.use('/api/products', productRouter)
router.use('/api/productdetail', productDetail)
router.use('/api/carts', cartRouter)


router.use('/pruebas', pruebasRouter)

router.get('/', (req, res) => {
    res.redirect('/login');
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/register', (req, res) => {
    res.render('register')
})

router.get('*', (req, res) => {
    res.send('Not found.')
})

export default router