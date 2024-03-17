import express from 'express';
import ProductController from '../../controllers/products.controller.js';
import { passportCall } from '../../middleware/pasportCall.js';
import { authorization } from '../../middleware/authentication.js';

const router = express.Router();

const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = new ProductController();

router.get('/', passportCall('jwt'), authorization( ['PUBLIC', 'USER_PREMIUM', 'ADMIN'] ), getProducts);
router.get('/:pid', passportCall('jwt'), authorization('ADMIN'), getProductById);
router.post('/', passportCall('jwt'), authorization('ADMIN'), createProduct);
router.put('/:pid', passportCall('jwt'), authorization('ADMIN'), updateProduct)
router.delete('/:pid', passportCall('jwt'), authorization('ADMIN'), deleteProduct)
// router.get('/allproducts', getAllUsers);

export default router;