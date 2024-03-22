import ProductManagerMongo from "../daos/mongo/product.mongo.js";
import { productService } from "../services/index.js";

class RealTimeProductsController {
    constructor(){
        // this.service = new ProductManagerMongo()
        this.service = productService
    };
    getRealTaProducts = async (req, res) => {
        try {
            const products = await this.service.getProducts();
            const product = products.map((product) => ({
                ...product.toObject(),
                }));
            console.log('GET / route called - Rendering realTimeProducts');
            res.render("realTimeProducts", { product });
        } catch (error) {
            console.log(error);
            res.render("Error al obtener la lista de productos!");
            return;
        }
    };
    getRealTaProduct = async (req, res) => {
        try {
            const { pid } = req.params;
            const product = await this.service.getProductById(pid);
            if (product) {
                res.json(product);
            } else {
                res.status(404).send("Producto no encontrado");
            }
        } catch (error) {
            console.log(error);
            res.status(500).send("Error al intentar obtener el producto.");
        }
    };
    createRealTaProduct = async (req, res) => {
        try {
            const product = req.body;
            const newProduct = await this.service.createProduct(product);
            res.status(201).json(newProduct);
        } catch (error) {
            console.error("Error al intentar agregar el producto:", error);
            res.status(500).json({ error: "Error interno del servidor al agregar el producto." });
        }
    };
    updateRealTaProduct = async (req, res) => {
        try {
            // const { pid } = req.params;
            // const updatedFields = req.body;
    
            // await this.service.updateProduct(pid, updatedFields);

            const productId = req.params.pid;
            const updatedFields = req.body;
    
            await this.service.updateProduct({ idProduct: productId, ...updatedFields });
    
            res.status(201).send({
                status: "success",
                message: "Producto actualizado correctamente.",
            });
        } catch (error) {
            console.error("Error al intentar actualizar el producto:", error);
            res.status(500).json({ error: "Error interno del servidor al actualizar el producto." });
        }
    };
    deleteRealTaProduct = async (req, res) => {
        try {
            const { pid } = req.params;
            await this.service.deleteProduct(pid);
    
            res.status(201).send({
                status: "success",
                message: "Producto eliminado correctamente.",
            });
        } catch (error) {
            console.error("Error al intentar eliminar el producto:", error);
            res.status(500).json({ error: "Error interno del servidor al eliminar el producto." });
        }
    };
}

export default RealTimeProductsController