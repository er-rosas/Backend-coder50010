const express = require('express')
const cartRouter = require('./routes/carts.router.js')
const productRouter = require('./routes/products.router.js')

const app = express()
const PORT = 8080;

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/carts', cartRouter)
app.use('/api/products', productRouter)

app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en el puerto ${PORT}`);
});