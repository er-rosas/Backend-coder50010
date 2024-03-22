import express from 'express';
import OrdersController from '../../controllers/orders.controller.js';
import { passportCall } from '../../middleware/pasportCall.js';
import { authorization } from '../../middleware/authentication.js';

const router = express.Router();

const {
    getOrders,
    getOrder,
    createOrder,
    updateOrder,
    deleteOrder } = new OrdersController();

router.get('/', passportCall('jwt'), authorization( ['PUBLIC', 'USER_PREMIUM', 'ADMIN'] ), getOrders);
router.get('/:oid', passportCall('jwt'), authorization( ['PUBLIC', 'USER_PREMIUM', 'ADMIN'] ), getOrder)
router.post('/:cid',passportCall('jwt'), authorization( ['PUBLIC', 'USER_PREMIUM', 'ADMIN'] ), createOrder)
router.put('/:oid', passportCall('jwt'), authorization( ['PUBLIC', 'USER_PREMIUM', 'ADMIN'] ), updateOrder)
router.delete('/:oid', passportCall('jwt'), authorization( ['PUBLIC', 'USER_PREMIUM', 'ADMIN'] ), deleteOrder)

export default router;