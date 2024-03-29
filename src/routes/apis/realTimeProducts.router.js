import express from 'express';
import RealTimeProductsController from '../../controllers/realTimeProducts.controller.js';
import { passportCall } from '../../middleware/pasportCall.js';
import { authorization } from '../../middleware/authentication.js';

const router = express.Router();

const {
    getRealTaProducts,
    getRealTaProduct,
    createRealTaProduct,
    updateRealTaProduct,
    deleteRealTaProduct
} = new RealTimeProductsController();

router.get('/', passportCall('jwt'), authorization('ADMIN'), getRealTaProducts)
router.get('/:pid', getRealTaProduct)
router.post('/', createRealTaProduct)
router.put('/:pid', updateRealTaProduct)
router.delete('/:pid', deleteRealTaProduct)

export default router;