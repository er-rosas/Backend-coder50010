const express = require('express')

const app = express()

// app.use(express.json())
// app.use(express.urlencoded({extended: true}))

const ProductManager = require('./manager/productManager.js');
const manager = new ProductManager('./manager/mockDB/products.json');

app.get('/products', async (req, res) => {
    try {
        const limit = req.query.limit;
        let products = await manager.getProducts();

        if (limit) {
            products = products.slice(0, parseInt(limit));
        }

        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

app.get('/products/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const product = await manager.getProductById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto por ID' });
    }
});

app.listen(8080, () => {
    console.log(`Servidor Express corriendo en el puerto 8080`);
});