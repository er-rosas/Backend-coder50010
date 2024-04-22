import express from 'express';
import viewsController from '../controllers/views.controller.js';
import { passportCall } from '../middleware/pasportCall.js';
import { authorization } from '../middleware/authentication.js';

const router = express.Router()

const {
    renderRedirect,
    renderForgotPassword,
    renderIndex,
    // renderProfile,
    renderProducts,
    renderDetail,
    renderCart,
    renderLogin,
    renderRegister,
    renderUsers,
    renderRealTimeProducts } = new viewsController();

router.get('/', renderRedirect)
router.get('/login', renderLogin)
router.get('/register', renderRegister)
router.get('/forgotPassword', renderForgotPassword)
router.get('/inicio', passportCall('jwt'), authorization( ['PUBLIC', 'USER_PREMIUM', 'ADMIN'] ), renderIndex);
// router.get('/profile', passportCall('jwt'), authorization( ['PUBLIC', 'USER_PREMIUM', 'ADMIN'] ), renderProfile)
router.get('/products', passportCall('jwt'), authorization( ['PUBLIC', 'USER_PREMIUM', 'ADMIN'] ), renderProducts)
router.get('/productdetail/:pid', passportCall('jwt'), authorization( ['PUBLIC', 'USER_PREMIUM', 'ADMIN'] ), renderDetail)
router.get('/carts/:cid', passportCall('jwt'), authorization( ['PUBLIC', 'USER_PREMIUM', 'ADMIN'] ), renderCart)
router.get('/users', passportCall('jwt'), authorization( ['PUBLIC','ADMIN'] ), renderUsers)
router.get('/realtimeproducts', passportCall('jwt'), authorization( ['PUBLIC', 'PREMIUM', 'USER_PREMIUM', 'ADMIN'] ), renderRealTimeProducts)

export default router;