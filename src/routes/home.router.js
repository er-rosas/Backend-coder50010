const express = require('express');
const ProductManager = require('../manager/productManager.js')

const router = express.Router();
const productManager = new ProductManager();

router.get("/", async (req, res) => {
    try {
        // const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
        const products = await productManager.getProducts();
        console.log('GET / route called - Rendering home');
        // console.log(products)
        res.render("home", { products });
    } catch (error) {
        console.log(error);
        res.render("Error al obtener la lista de productos!");
        return;
    }
});

module.exports = router;