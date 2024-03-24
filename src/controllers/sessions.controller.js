import { generateToken, verifyToken } from "../utils/jsonwebtoken.js";
import { createHash, isValidPassword } from "../utils/hashBcrypt.js";
import { userService, cartService, productService } from "../services/index.js";
import { sendMail } from "../utils/sendEmail.js";
import CustomError from "../utils/errors/customError.js";
import generateUserErrorInfo from "../utils/errors/info.js";
import EErrors from "../utils/errors/enums.js";

class SessionController{
    constructor(){
        this.service = userService
        this.cartService = cartService
        // this.service = new UserManagerMongo()
        // this.cartService = new CartManagerMongo()
    };
    registerSession = async (req, res, next)=>{
        try {
            const {
                first_name,
                last_name,
                email, 
                password
            } = req.body 
        
            if(!first_name || !last_name || !email) {
                CustomError.createError({
                    name: "User creation error",
                    cause: generateUserErrorInfo({
                        first_name,
                        last_name,
                        email
                    }),
                    message: 'Error truing to created user',
                    code: EErrors.INVALID_TYPE_ERROR
                })
            };

            // Verificar si el usuario ya existe en la base de datos
            const existingUser = await this.service.getUser({email});
            if (existingUser) {
                // Si el usuario ya existe, enviar un mensaje de error o realizar alguna acción apropiada
                return res.status(400).send({ status: 'error', message: 'El usuario ya está registrado.' });
            }
            // Crear un carrito para el usuario
            const cart = await this.cartService.createCart(email);
            console.log("cartid: " + cart._id + " cart: " + cart)
            // Si el usuario no existe, crearlo
            // Crear el usuario y asignarle el ID del carrito
            //const cartId = cart._id
            const result = await this.service.createUser({
                first_name,
                last_name,
                email,
                password: createHash(password),
                cartId: cart.id
            })
            const destinatario =  `${email}`;//'er.rosas24@gmail.com'
            const subject = 'Nuevo usuario';
            const html = '<div><h1>Usted se ha regtrado con exito.</h1></div>';
        
            sendMail(destinatario, subject, html)
            
            console.log("user: " + result)
            res.redirect('/login');
        } catch (error) {
            // console.error('Error al procesar la solicitud:', error);
            // res.status(500).send({status: 'error', message: 'Hubo un problema al procesar la solicitud.'});
            next(error)
        }
    };
    loginSession = async (req, res)=>{
        try {
            const { email, password } = req.body
            console.log(req.body.email, req.body.password)
        
            const userFoundDB = await userService.getUser( {email} )
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
            }).redirect('/inicio')
        } catch (error) {
            console.error('Error al procesar la solicitud:', error);
        }
        
    };
    logoutSession = (req, res)=>{
        try {
            res.clearCookie('cookieToken').redirect('/login')
        } catch (error) {
            console.log(error)
        }
    };
    currentSession = async (req, res) => {
        try {
            const userEmail = req.user.email
            const user = await this.service.getUserCurrent({ email: userEmail });
            res.send({
                message: 'datos sensibles',
                id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email
            })            
        } catch (error) {
            res.send({status: 'error', error})   
        }
    };
};

export default SessionController;