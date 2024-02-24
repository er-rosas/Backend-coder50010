import express from "express"
import UserManagerMongo from "../../daos/mongo/userManagerMongo.js"

import { generateToken, verifyToken } from '../../utils/jsonwebtoken.js'
import { createHash, isValidPassword } from "../../utils/hashBcrypt.js"

const router = express.Router()

const userService = new UserManagerMongo()

router.post('/register', async (req, res)=>{
    try {
        const {
            first_name,
            last_name,
            email, 
            password
        } = req.body 
    
        // validar si estan en la base de datos
        const result = await userService.createUser({
            first_name,
            last_name,
            email,
            password: createHash(password)
        })
    
        res.redirect('/login');
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        res.status(500).send({status: 'error', message: 'Hubo un problema al procesar la solicitud.'});
    }
});

router.post('/login', async (req, res)=>{
    const { email, password } = req.body
    console.log(req.body.email, req.body.password)

    const userFoundDB = await userService.getUserBy( {email} )
    console.log(userFoundDB)
    console.log(userFoundDB.password)

    // validar el password
    if ( !isValidPassword(password, userFoundDB.password) ) {
        return res.status(401).send('Contraseña incorrecta')
    }

    const token = generateToken({id: userFoundDB._id, role: 'user', email})

    res.cookie('cookieToken', token, {
        maxAge: 60*60*1000*24,
        httpOnly: true
    }).redirect('/api/products')
});

router.get('/logout', (req, res)=>{
    res.clearCookie('cookieToken').redirect('/login')
});

router.get('/current', async (req, res) => {
    // Obtener el token de la cookie
    const token = req.cookies.cookieToken;
    
    // Verificar si el token está presente
    if (!token) {
        return res.status(401).send('No se proporcionó el token');
    }

    try {
        // Verificar el token
        const decodedToken = verifyToken(token);
        
        // Obtener el usuario asociado al token
        const user = await userService.getUser(decodedToken.id);
        
        if (!user) {
            return res.status(404).send('Usuario no encontrado');
        }

        // Si todo está bien, enviar los datos del usuario
        return res.send({
            id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email
            // Otros datos sensibles que desees devolver
        });
    } catch (error) {
        console.error(error);
        return res.status(401).send('Token inválido');
    }
});

export default router;