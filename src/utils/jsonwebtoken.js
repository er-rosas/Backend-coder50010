import jwt from 'jsonwebtoken'
import { configObject } from '../config/connectDB.js';

const PRIVATE_KEY = configObject.jwt_secret_Key

// export const PRIVATE_KEY = 'estaEsl@cl@vEpara3lToken'


/// { id, email, role }
// export const generateToken = user => jwt.sign(user, this.PRIVATE_KEY, {
//     expiresIn: '1d'
// })

export const generateToken = user => jwt.sign(user, PRIVATE_KEY, {
    expiresIn: '1d'
});

// Función para verificar un token JWT
export function verifyToken(token) {
    return jwt.verify(token, PRIVATE_KEY);
}