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
    getProductsPaginate,
    createCineProucts
    // productDetail
} = new ProductController();

router.get('/', getProducts);
router.post('/', createProductss);
router.get('/productPaginate', getProductsPaginate);
router.get('/mockingproducts', createCineProucts);
router.get('/:pid', getProductById);
router.put('/:pid', updateProduct);
router.delete('/:pid', deleteProduct);

export default router;