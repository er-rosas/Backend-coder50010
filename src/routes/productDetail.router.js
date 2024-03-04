import express from 'express';
import ProductController from '../controllers/products.controller.js';
import { passportCall } from '../middleware/pasportCall.js';
import { authorization } from '../middleware/authentication.js';

const router = express.Router();

const { productDetail } = new ProductController()

router.get('/:pid', passportCall('jwt'), authorization( ['PUBLIC', 'USER_PREMIUM', 'ADMIN'] ), productDetail)

export default router;