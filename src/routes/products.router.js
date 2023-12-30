const express = require('express');
const router = express.Router();


const ProductManager = require('../manager/productManager.js');
const manager = new ProductManager('.src/mockDB/products.json');

router.get('/', async (req, res) => {
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

router.get('/:pid', async (req, res) => {
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

router.post('/', async (req, res) => {
    try {
        const {
            title,
            description,
            code,
            price,
            stock,
            category,
            thumbnails
        } = req.body;

        // Validar campos obligatorios
        if (!title || !description || !code || !price || !stock || !category) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios excepto thumbnails' });
        }

        // Crear el nuevo producto
        const newProduct = {
            title,
            description,
            code,
            price: Number(price),
            status: true,
            stock: Number(stock),
            category,
            thumbnails: thumbnails || [], // Si no hay thumbnails establecer como un array vacío
        };

        const addedProduct = await manager.addProduct(newProduct);

        res.status(201).json(addedProduct);
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar el producto' });
    }
});

router.put('/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const updatedFields = req.body;

        await manager.updateProduct(productId, updatedFields);

        res.json({ message: 'Producto actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
});

router.delete('/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);

        await manager.deleteProduct(productId);

        res.json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
});

module.exports = router

// 1. Obtener todos los productos:
// Método: GET
// URL: http://localhost:8080/api/products/

// http://localhost:8080/api/products?limit=5 , eso debe devolver sólo los primeros 5 de los 10 productos.

// 2. Obtener un producto por su ID:
// Método: GET
// URL: http://localhost:8080/api/products/{pid}

// 3. Agregar un nuevo producto:
// Método: POST
// URL: http://localhost:8080/api/products/
// Cuerpo (en formato JSON):
// {
//     "title": "Producto nuevo",
//     "description": "Descripción del producto",
//     "code": "ABC123",
//     "price": 29.99,
//     "stock": 100,
//     "category": "Electrónicos",
//     "thumbnails": [
//         "url1",
//         "url2"
//     ]
// }
// 4. Actualizar un producto por su ID:
// Método: PUT
// URL: http://localhost:8080/api/products/{pid}
// Cuerpo (en formato JSON con los campos a actualizar):
// {
//     "price": 39.99,
//     "stock": 80
// }
// 5. Eliminar un producto por su ID:
// Método: DELETE
// URL: http://localhost:8080/api/products/{pid}