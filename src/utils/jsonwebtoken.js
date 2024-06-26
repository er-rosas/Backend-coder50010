import jwt from 'jsonwebtoken'
import { configObject } from '../config/config.js';

const PRIVATE_KEY = configObject.jwt_secret_Key

export const generateToken = (user={}, expiresIn='5d') => {
    // console.log(user)
    const token = jwt.sign(user, PRIVATE_KEY, {expiresIn})
    return token
}

// Función para verificar un token JWT
export function verifyToken(token) {
    try {
        return jwt.verify(token, PRIVATE_KEY);
    } catch (error) {
        return false
    }
}