import express from "express"
// import auth from "../../middleware/authenticaction.middleware.js"
import UserManagerMongo from "../../daos/mongo/userManagerMongo.js"
// import { createHash, isValidPassword } from "../../utils/hashBcrypt.js"
import passport from "passport"

const router = express.Router()

const sessionService = new UserManagerMongo()


// router.post('/login', async (req, res) => {
//     const {email, password} = req.body
//     console.log(email, password);
    
//     if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
//         req.session.user = {id: "coderHouse", username: "Coder House", email: "adminCoder@coder.com", role: "admin"}
//         res.redirect('/api/products');
//         return;
//     };
    
//     const user = await sessionService.getUserBy({email})
//     if(!user) return res.send({status: 'error', error: 'Usuario con ese email no existe'})

//     if (!isValidPassword(password, user.password)) return res.status(401).send('No coinciden las credenciales.')

//     req.session.user = {id: user._id, username: user.first_name, email: user.email, role: user.role}
//     console.log('req session user sessions', req.session.user);
//     // res.send('Login success')
//     res.redirect('/api/products');
// })

// router.post('/register', (req, res) => {
//     try {
//         const {first_name, last_name, email, password} = req.body // También se pueden enviar por query
//         console.log(first_name, last_name, email, password);
//         if (email === '' || password === '') return res.send('Faltan campos obligatorios')


//         const newUser = {
//             first_name,
//             last_name,
//             email,
//             password: createHash(password),
//             // role: "admin" // En caso de querer crear usuarios con el role: admin
//         }

//         const result = sessionService.createUser(newUser)
//         // res.send({status: 'success', payload: newUser })
//         res.redirect('/login'); //login
//     } catch (error) {
//         res.send({status: 'error', error: error.message })
//     }
// })

// router.get('/logout', (req, res) => {
//     req.session.destroy(error => {
//         if (error) {return res.status(401).send(error)}
//         // res.send({status: 'success', message: 'Logout ok'})
//     });
//     res.redirect('/login'); //login
// });

// router.get('/current', auth,(req, res) => {
//     res.send('Datos sensibles')
// });




router.post('/register', passport.authenticate('register', {failureRedirect: '/api/sessions/failregister'}) ,async (req, res)=>{
    // res.send({status: 'success', message: 'user registered'});
    res.redirect('/login');
});

router.get('/failregister', async (req, res) => {
    res.send({error: 'falla en el register'})
});

router.post('/login', passport.authenticate('login', {failureRedirect: '/api/sessions/faillogin'}) ,async (req, res)=>{
    if (!req.user) return res.status(401).send({status: 'error', error: 'creadential invalid'})
    
    req.session.user = { 
        first_name: req.user.first_name, 
        last_name: req.user.last_name,
        email: req.user.email, 
        id: req.user._id,
        role: req.user.role
    }
    
    // res.send({status: 'success', message: req.user});
    res.redirect('/api/products');
});

router.get('/faillogin', async (req, res) => {
    res.send({error: 'falla en el login'})
});

router.get('/logout', (req, res) => {
    req.session.destroy(error => {
        if (error) {return res.status(401).send(error)}
        // res.send({status: 'success', message: 'Logout ok'})
    });
    res.redirect('/login'); //login
});

router.get('/current', async (req, res) => {
    res.send({message: 'datos sensibles'})
});

router.get('/github', passport.authenticate('github', {scope:['user:email']}),async (req, res) => {})

router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/api/sessions/login'} ),async (req, res) => {
    req.session.user = req.user
    res.redirect('/api/products')
});

export default router;