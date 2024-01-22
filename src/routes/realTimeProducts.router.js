import express from 'express';
import ProductManager from '../daos/file/productManager.js';

const router = express.Router();
const productManager = new ProductManager();


router.get("/", async (req, res) => {
    try {
        // const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
        const products = await productManager.getProducts();
        console.log('GET / route called - Rendering realTimeProducts');
        res.render("realTimeProducts", { products });
    } catch (error) {
        console.log(error);
        res.render("Error al obtener la lista de productos!");
        return;
    }
});

router.get("/:pid", async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await productManager.getProductById(Number(pid));
        if (product) {
            res.json(product);
        } else {
            res.status(404).send("Producto no encontrado");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al intentar obtener el producto.");
    }
});

router.post("/", async (req, res) => {
    try {
        const product = req.body;
        const newProduct = await productManager.addProduct(product);
        res.status(201).json(newProduct);
    } catch (error) {
        console.error("Error al intentar agregar el producto:", error);
        res.status(500).json({ error: "Error interno del servidor al agregar el producto." });
    }
});

router.put("/:pid", async (req, res) => {
    try {
        const { pid } = req.params;
        const updatedFields = req.body;

        await productManager.updateProduct(parseInt(pid), updatedFields);

        res.status(201).send({
            status: "success",
            message: "Producto actualizado correctamente.",
        });
    } catch (error) {
        console.error("Error al intentar actualizar el producto:", error);
        res.status(500).json({ error: "Error interno del servidor al actualizar el producto." });
    }
});

router.delete("/:pid", async (req, res) => {
    try {
        const { pid } = req.params;
        await productManager.deleteProduct(parseInt(pid));

        res.status(201).send({
            status: "success",
            message: "Producto eliminado correctamente.",
        });
    } catch (error) {
        console.error("Error al intentar eliminar el producto:", error);
        res.status(500).json({ error: "Error interno del servidor al eliminar el producto." });
    }
});

export default router;