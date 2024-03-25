import express from 'express';
import ProductController from '../../controllers/products.controller.js';
import { passportCall } from '../../middleware/pasportCall.js';
import { authorization } from '../../middleware/authentication.js';

const router = express.Router();

const {
    getProducts,
    getProductById,
    createProductss,
    updateProduct,
    deleteProduct,
    createCineProucts
} = new ProductController();

router.get('/', getProducts);
router.get('/:pid', passportCall('jwt'), authorization('ADMIN'), getProductById);
router.post('/', passportCall('jwt'), authorization('ADMIN'), createProductss);
router.put('/:pid', passportCall('jwt'), authorization('ADMIN'), updateProduct)
router.delete('/:pid', passportCall('jwt'), authorization('ADMIN'), deleteProduct)
// router.get('/allproducts', getAllUsers);


// No me funciono pero en el que hice en el pruebas.router si
//Crear 100 productos
router.get('/mockingproducts', createCineProucts)

export default router;