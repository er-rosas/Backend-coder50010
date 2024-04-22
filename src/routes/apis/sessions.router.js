import express from "express"
import SessionController from "../../controllers/sessions.controller.js"
import { passportCall } from '../../middleware/pasportCall.js';
import { authorization } from '../../middleware/authentication.js';

const router = express.Router()

const {
    registerSession,
    loginSession,
    logoutSession,
    currentSession,
    resetPasswordToken,
    forgotPassword,
    resetPassword
} = new SessionController();

router.post('/register', registerSession)
router.post('/login', loginSession)
router.get('/logout', logoutSession)
router.get('/current', passportCall('jwt'), authorization( ['PUBLIC', 'USER', 'USER_PREMIUM', 'ADMIN'] ), currentSession)
// cambiar contraseña
// Ruta para mandar un mail con un link para cambiar la contraseña
//router.post('/forgot-password', passportCall('jwt'), authorization( ['PUBLIC', 'USER_PREMIUM', 'ADMIN'] ), forgotPassword)
router.post('/forgot-password', forgotPassword)   
// Cambiar la contraseña        
router.get('/reset-password/:token', resetPasswordToken)
// this.post('/reset-password/:token', async (req, res)=>{
router.post('/reset-password', resetPassword)

export default router;