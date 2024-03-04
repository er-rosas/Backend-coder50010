import express from "express"
import SessionController from "../../controllers/sessions.controller.js"
// import { generateToken, verifyToken } from '../../utils/jsonwebtoken.js'
// import { createHash, isValidPassword } from "../../utils/hashBcrypt.js"

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
router.get('/current', currentSession)

export default router;