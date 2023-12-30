const express = require('express')
const CartsManagerFS = require('../manager/cartsManagerFS')

const router = express.Router()

const cartsService = new CartsManagerFS()

router.post('/', async (req, res)=>{
    try {
        const result = await cartsService.createCart()
        res.send({
            status: 'success',
            payload: result
        })
    } catch (error) {
        res.status(500).send(`Error de server ${error.message}`)
    }
})
router.get('/:cid', async (req, res)=>{
    try {
        const {cid} = req.params
        const cart = await cartsService.getCartById(parseInt(cid))
        res.send({
            status: 'success',
            payload: cart
        })
    } catch (error) {
        console.log(error)
    }
})
router.post('/:cid/product/:pid', async (req, res)=>{
    try {
        const {cid, pid} = req.params
        const result = await cartsService.addProductToCart(Number(cid), Number(pid))
        res.send({
            status: 'success',
            payload: result
    })
    } catch (error) {
        console.log(error)
    }
})

module.exports = router

// 1. Crear un nuevo carrito (POST /api/carts/):
// Método: POST
// URL: http://localhost:8080/api/carts

// 2. Obtener un carrito por ID (GET /api/carts/:cid):
// Método: GET
// URL: http://localhost:8080/api/carts/1

// 3. Agregar un producto a un carrito (POST /api/carts/:cid/product/:pid):
// Método: POST
// URL: http://localhost:8080/api/carts/1/product/1
// Cuerpo (en formato JSON):
//  {
//     "quantity": 1
//  }