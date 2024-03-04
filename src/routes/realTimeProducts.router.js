import express from 'express';
import ProductManagerMongo from '../daos/mongo/productsManagerMongo.js';
import RealTimeProductsController from '../controllers/realTimeProducts.controller.js';

const router = express.Router();
const managerMongo = new ProductManagerMongo();

const {
    getRealTaProducts,
    getRealTaProduct,
    createRealTaProduct,
    updateRealTaProduct,
    deleteRealTaProduct
} = new RealTimeProductsController();

router.get('/', getRealTaProducts)
router.get('/:pid', getRealTaProduct)
router.post('/', createRealTaProduct)
router.put('/:pid', updateRealTaProduct)
router.delete('/:pid', deleteRealTaProduct)

// router.get("/", async (req, res) => {
//     try {
//         const products = await managerMongo.getProducts();
//         const product = products.map((product) => ({
//             ...product.toObject(),
//             }));
//         console.log('GET / route called - Rendering realTimeProducts');
//         res.render("realTimeProducts", { product });
//     } catch (error) {
//         console.log(error);
//         res.render("Error al obtener la lista de productos!");
//         return;
//     }
// });

// router.get("/:pid", async (req, res) => {
//     try {
//         const { pid } = req.params;
//         const product = await managerMongo.getProductById(pid);
//         if (product) {
//             res.json(product);
//         } else {
//             res.status(404).send("Producto no encontrado");
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).send("Error al intentar obtener el producto.");
//     }
// });

// router.post("/", async (req, res) => {
//     try {
//         const product = req.body;
//         const newProduct = await managerMongo.createProduct(product);
//         res.status(201).json(newProduct);
//     } catch (error) {
//         console.error("Error al intentar agregar el producto:", error);
//         res.status(500).json({ error: "Error interno del servidor al agregar el producto." });
//     }
// });

// router.put("/:pid", async (req, res) => {
//     try {
//         const { pid } = req.params;
//         const updatedFields = req.body;

//         await managerMongo.updateProduct(pid, updatedFields);

//         res.status(201).send({
//             status: "success",
//             message: "Producto actualizado correctamente.",
//         });
//     } catch (error) {
//         console.error("Error al intentar actualizar el producto:", error);
//         res.status(500).json({ error: "Error interno del servidor al actualizar el producto." });
//     }
// });

// router.delete("/:pid", async (req, res) => {
//     try {
//         const { pid } = req.params;
//         await managerMongo.deleteProduct(pid);

//         res.status(201).send({
//             status: "success",
//             message: "Producto eliminado correctamente.",
//         });
//     } catch (error) {
//         console.error("Error al intentar eliminar el producto:", error);
//         res.status(500).json({ error: "Error interno del servidor al eliminar el producto." });
//     }
// });

export default router;