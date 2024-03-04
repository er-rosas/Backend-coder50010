import express from 'express';
import ProductController from '../controllers/products.controller.js';
import { passportCall } from '../middleware/pasportCall.js';
import { authorization } from '../middleware/authentication.js';

const router = express.Router();

const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = new ProductController();

router.get('/', passportCall('jwt'), authorization( ['PUBLIC', 'USER_PREMIUM', 'ADMIN'] ), getProducts);
router.get('/:pid', getProductById);
router.post('/', createProduct);
router.put('/:pid', updateProduct)
router.delete('/:pid', deleteProduct)
// router.get('/allusers', getAllUser);

export default router;