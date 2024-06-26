import { productService } from "../services/index.js";
import { generateProducts } from "../utils/faker.js";

class ProductController{
    constructor(){
        this.service = productService
        // this.service = ProductDao
        // this.service = new ProductManagerMongo()
    };

    getProducts = async (req, res) => {
        try {
            const products = await this.service.getProducts();
            res.json(products);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener el producto por ID' });
        }
    };

    getProductById = async (req, res) => {
        try {
            const productId = req.params.pid;
            const product = await this.service.getProduct(productId);
            
            if (!product) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }
            
            res.json(product);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener el producto por ID' });
        }
    };

    createProductss = async (req, res) => {
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
            
            if (!title || !description || !code || !price || !stock || !category) {
                return res.status(400).json({ error: 'Todos los campos son obligatorios excepto thumbnails' });
            }
            
            const newProduct = {
                title,
                description,
                code,
                price: Number(price),
                stock: Number(stock),
                category,
                thumbnails: thumbnails || [],
            };
            
            const addedProduct = await this.service.createProduct(newProduct);
            
            res.status(200).send({
                message: "Producto creado correctamente",
                payload: addedProduct
            });
            // res.status(201).json({
            //     message: "Producto creado correctamente",
            //     payload: addedProduct
            // });
        } catch (error) {
            res.status(500).json({ error: 'Error al agregar el producto' });
        }
    };

    updateProduct = async (req, res) => {
        try {
            const productId = req.params.pid;
            const updatedFields = req.body;
            
            await this.service.updateProduct({ idProduct: productId, ...updatedFields });
            
            res.json({ message: 'Producto actualizado correctamente' });
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar el producto' });
        }
    };

    deleteProduct = async (req, res) => {
        try {
            const productId = req.params.pid;
            
            const respuesta = await this.service.deleteProduct(productId);

            if (!respuesta) {
                return res.status(401).json({
                    status: 'error',
                    payload: 'Producto no existe en la base de datos'
                })
            }
    
            res.json({ message: 'Producto eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar el producto' });
        }
    };

    productDetail = async (req, res) => {
        try {
            const { pid } = req.params;
            const productid = await this.service.getProduct(pid);

            const userData = req.user;
            
            if (!productid) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }
            
            const product = productid.toObject();
            // console.log(product)
            res.render("productDetail", { 
                product, 
                user: userData });
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener el producto por ID' });
        }
    };

    getProductsPaginate = async (req, res) => {
        try {
            const userData = req.user;
            
            const { limit = 5, pageQuery = 1, category } = req.query;
            const uniqueCategories = await this.service.getUniqueCategories();
            const query = category ? { category, isActive: true } : { isActive: true };
            const {
                docs,
                hasPrevPage,
                hasNextPage,
                prevPage,
                nextPage,
                page
            } = await this.service.getPaginate(limit, pageQuery, query);

            res.status(200).json( {
                product: docs,
                hasPrevPage,
                hasNextPage,
                prevPage,
                nextPage,
                page,
                uniqueCategories,
                user: userData
            });
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    };

    createCineProucts = async (req, res) => {
        try {
            let newProduct
            const addedProducts = []
            let productToAdd
            for (let i = 0; i < 1; i++) {
                newProduct = generateProducts();
                console.log(newProduct)
                productToAdd = await productService.createProduct(newProduct);
                addedProducts.push(productToAdd);
            }
            res.send({
                status: '',
                payload: addedProducts
            })
        } catch (error) {
            return error
        }
    };
};

export default ProductController;