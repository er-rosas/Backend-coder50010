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

//router.get('/', passportCall('jwt'), authorization(['PUBLIC', 'USER', 'USER_PREMIUM', 'ADMIN']), getRealTaProducts)
router.get('/', authorization(['PUBLIC']), getRealTaProducts)
router.get('/:pid', authorization(['PUBLIC']), getRealTaProduct)
router.post('/', authorization(['PUBLIC']), createRealTaProduct)
router.put('/:pid', authorization(['PUBLIC']), updateRealTaProduct)
router.delete('/:pid', passportCall('jwt'), authorization(['PUBLIC', 'USER', 'USER_PREMIUM', 'ADMIN']), deleteRealTaProduct)

export default router;