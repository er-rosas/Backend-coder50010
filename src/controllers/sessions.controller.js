import { generateToken, verifyToken } from "../utils/jsonwebtoken.js";
import { createHash, isValidPassword } from "../utils/hashBcrypt.js";
import { userService, cartService, productService } from "../services/index.js";
import { sendMail } from "../utils/sendEmail.js";
import CustomError from "../utils/errors/customError.js";
import generateUserErrorInfo from "../utils/errors/info.js";
import EErrors from "../utils/errors/enums.js";
import { logger } from "../utils/logger.js";
//import { use } from "passport";

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
            
            console.log("user: " + result);
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
            //res.status(200).redirect('/login')
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
    
    forgotPassword = async (req, res)=>{
        try {
            
            const { email } = req.body
            console.log(email)
            // buscar el usuario en la base de datos
            //const {_doc: doc} = await userModel.findOne( {email})
            const user = await this.service.getUser({email});
            console.log(user)

            //const {password, _id, ...} = user        
            logger.info(user)
            if (!user) return res.status(400).send({status: 'error', message: 'El usuario no existe'})
        
            // generar un token para el usuario
            const token = generateToken({id: user._id, email, first_name: user.first_name, role: user.role, cartId: user.cartId}, '1h')
            // logger.info(token)
            console.log(token)
            console.log(user.first_name);


            // configurar el mail
            const destinatario =  `${email}`;//'er.rosas24@gmail.com'
            const subject = 'Restablecer contraseña'
            const html = `
                            <p> Hola ${user.first_name}, </p>
                            <p> Has solicitado restablecer tu contraseña. Haz clic en el siguiente enlace para continuar:</p>
                            <a href="http://localhost:8080/api/sessions/reset-password/${token}">Restablecer contraseña</a>
                            <p>Este enlace expirará en 1 hora.</p>
                        `
        
            // enviar un mail con el link para cambiar la contraseña
            sendMail(destinatario, subject, html)
        
            res.status(200).send({status: 'success', message: 'Mail enviado, revise su bandeja de entrada o spam'})
        } catch (error) {
            logger.info(error)
        }
    }

    resetPasswordToken = async (req, res)=>{
        try {
            const {token} = req.params
            res.render('resetPass', {token, showNav: false})
        } catch (error) {
            logger.info(error)
        }
    }

    resetPassword = async (req, res)=>{
        try {
            const { passwordNew, passwordConfirm, token } = req.body
        
            // validar las contraseñas recibidas si estan vacias y si son iguales
            if (!passwordNew || !passwordConfirm || passwordNew !== passwordConfirm) return res.status(400).send({
                status: 'error', 
                message: 'Las contraseñas no pueden estar vacías y deben coincidir'
            })
            if (passwordNew !== passwordConfirm) return res.status(400).send({status: 'error', message: 'Las contraseñas no coinciden'})
            //console.log("Aqui")
            const decodedUser = verifyToken(token)

            //console.log("Token(decoder) Email:    " + decodedUser)
            
            
            if (!decodedUser) return res.status(400).send({status: 'error', message: 'El token no es válido o ha expirado'})

            // if (!decodedUser) {
            //     res.status(400).send({ status: 'error', message: 'El token no es válido o ha expirado' });

            //     setTimeout(() => {
            //         res.redirect('/forgotPassword');
            //     }, 5000); // 5000 milisegundos = 5 segundos
            // }
        
            // // buscar el usuario en la base de datos
            const userDB = await this.service.getUser({email: decodedUser.email})
            
            if (!userDB) return res.status(400).send({status: 'error', message: 'El usuario no existe'})
        
            // verificar si las contraseñas sean iguales no es valida
            let isValidPass = isValidPassword(passwordNew, userDB.password)
            
            if (isValidPass) return res.status(400).send({status: 'error', message: 'No puedes usar una contraseña anterior.'})

            //console.log("   ---");

            const uid = userDB._id;
            //console.log("uid:     " + uid);
            // let uidObj = uid.toObjet();
            // console.log(uidObj + "  user id to object");

            let userPassword = {password: createHash(passwordNew)}
            //console.log("userpassword:     " + userPassword.password);
        
            const result = await this.service.updateUser(uid, userPassword)
            // const result = await userModel.findByIdAndUpdate({_id: userDB._id}, {
            //     password: createHash(passwordNew)
            // })
            // console.log("uidYpassnew:     " + uid, passwordNew);
            // console.log("Result:    " + result)
        
            if (!result) return res.status(400).send({status: 'error', message: 'Error al actualizar la contraseña'})
        
            res.status(200).send({
                status: 'success', 
                message: 'Contraseña actualizada correctamente'
            })
        } catch (error) {
            logger.info(error)
            //return res.status(400).send({status: 'error', message: 'El token no es válido o ha expirado'})
        }
    }

    
};

export default SessionController;