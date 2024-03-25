import { faker } from "@faker-js/faker";
import { productService } from "../services/index.js";

class ProductController{
    constructor(){
        this.service = productService
        // this.service = ProductDao
        // this.service = new ProductManagerMongo()
    };
    getProducts = async (req, res) => {
        try {
            // Verificar si la cookieToken no está presente en la solicitud
            // if (!req.cookies.cookieToken) {
            //     // Redirigir al usuario al login
            //     return res.redirect('/login');
            // }

            // Obtener los datos del usuario del objeto request
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
    
            res.status(201).json(addedProduct);
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
    
            await this.service.deleteProduct(productId);
    
            res.json({ message: 'Producto eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar el producto' });
        }
    };
    getProductCode = () => {};
    getAllProducts = () => {};

    productDetail = async (req, res) => {
        try {
            const { pid } = req.params;
            const productid = await this.service.getProduct(pid);
            // console.log(productid)
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


    // No me funciono pero en el que hice en el pruebas.router si
    createCineProucts = async (req, res) => {
        try {
            
            // const generateProducts = () => {
            //     return {
            //         title: faker.commerce.productName(),
            //         code: faker.string.alphanumeric(6),
            //         desciption: faker.commerce.productDescription(),
            //         price: Number(faker.commerce.price()),
            //         stock: parseInt(faker.string.numeric()),
            //         category: faker.commerce.productAdjective(),
            //         thumbnails: faker.image.url(),
            //     }
            // }

            // // let newproducts
            // // const addedProduct = {}
            // // for (let i = 0; i < 1; i++) {
            // //     newproducts.push(generateProducts())
            // //     addedProduct = await this.service.createProduct(newproducts);
            // // }

            // // let newProducts = [];
            // // for (let i = 0; i < 1; i++) {
            // //     newProducts.push(await this.service.generateProducts());
            // // }

            // // const promises = newProducts.map(product => this.service.createProduct(product));
            // // const addedProduct = await Promise.all(promises);

            // //const addedProducts = [];
            // for (let i = 0; i < 1; i++) {
            //     const newProduct = generateProducts();
            //     console.log(newProduct)
            //     //const addedProduct = await this.service.createProduct(newProduct);
            //     //addedProducts.push(addedProduct);
            // }

            // const addedProduct = await this.service.generateProducts();

            // res.send({
            //     status: '',
            //     payload: addedProduct
            // })


        } catch (error) {
            res.status(500).json({ error: 'Error al obtener el producto por ID' });
        }
    };
};

export default ProductController;