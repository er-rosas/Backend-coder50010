import ProductManagerMongo from "../daos/mongo/productsManagerMongo.js";
import UserManagerMongo from "../daos/mongo/userManagerMongo.js";
import CartManagerMongo from "../daos/mongo/cartsManagerMongo.js";
import { generateToken, verifyToken } from "../utils/jsonwebtoken.js";
import { createHash, isValidPassword } from "../utils/hashBcrypt.js";

class SessionController{
    constructor(){
        this.service = new UserManagerMongo()
        this.cartService = new CartManagerMongo()
    };
    registerSession = async (req, res)=>{
        try {
            const {
                first_name,
                last_name,
                email, 
                password
            } = req.body 
        
            // Verificar si el usuario ya existe en la base de datos
            const existingUser = await this.service.getUserBy({email});
            if (existingUser) {
                // Si el usuario ya existe, enviar un mensaje de error o realizar alguna acción apropiada
                return res.status(400).send({ status: 'error', message: 'El usuario ya está registrado.' });
            }
            // Crear un carrito para el usuario
            const cart = await this.cartService.createCart();

            // Si el usuario no existe, crearlo
            // Crear el usuario y asignarle el ID del carrito
            const result = await this.service.createUser({
                first_name,
                last_name,
                email,
                password: createHash(password),
                cartId: cart._id
            })
        
            res.redirect('/login');
        } catch (error) {
            console.error('Error al procesar la solicitud:', error);
            res.status(500).send({status: 'error', message: 'Hubo un problema al procesar la solicitud.'});
        }
    };
    loginSession = async (req, res)=>{
        const { email, password } = req.body
        console.log(req.body.email, req.body.password)
    
        const userFoundDB = await this.service.getUserBy( {email} )
        console.log(userFoundDB)
        console.log(userFoundDB.password)
    
        // validar el password
        if ( !isValidPassword(password, userFoundDB.password) ) {
            return res.status(401).send('Contraseña incorrecta')
        }
    
        const token = generateToken({id: userFoundDB._id, email, first_name: userFoundDB.first_name, role: userFoundDB.role, cartId: userFoundDB.cartId})
    
        res.cookie('cookieToken', token, {
            maxAge: 60*60*1000*24,
            httpOnly: true
        }).redirect('/api/products')
    };
    logoutSession = (req, res)=>{
        res.clearCookie('cookieToken').redirect('/login')
    };
    currentSession = async (req, res) => {
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
            const user = await this.service.getUser(decodedToken.id);
            
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
    };
};

export default SessionController;