import express from "express"
import SessionController from "../../controllers/sessions.controller.js"
// import { generateToken, verifyToken } from '../../utils/jsonwebtoken.js'
// import { createHash, isValidPassword } from "../../utils/hashBcrypt.js"
import { passportCall } from '../../middleware/pasportCall.js';
import { authorization } from '../../middleware/authentication.js';

const router = express.Router()

const {
    registerSession,
    loginSession,
    logoutSession,
    currentSession
} = new SessionController();

router.post('/register', registerSession)
router.post('/login', loginSession)
router.get('/logout', logoutSession)
router.get('/current', passportCall('jwt'), authorization( ['PUBLIC', 'USER_PREMIUM', 'ADMIN'] ), currentSession)

export default router;