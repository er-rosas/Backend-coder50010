import express from "express"
import auth from "../../middleware/authenticaction.middleware.js"
import UserManagerMongo from "../../daos/mongo/userManagerMongo.js"

const router = express.Router()

const sessionService = new UserManagerMongo()


router.post('/login', async (req, res) => {
    const {email, password} = req.body
    console.log(email, password);
    
    if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
        req.session.user = {id: "coderHouse", username: "Coder House", email: "adminCoder@coder.com", role: "admin"}
        res.redirect('/api/products');
        return;
    };
    const user = await sessionService.getUserBy({email})
    if(!user) return res.send({status: 'error', error: 'Usuario con ese email no existe'})

    req.session.user = {id: user._id, username: user.first_name, email: user.email, role: user.role}
    console.log('req session user sessions', req.session.user);
    // res.send('Login success')
    res.redirect('/api/products');
})

router.post('/register', (req, res) => {
    try {
        const {first_name, last_name, email, password} = req.body // También se pueden enviar por query
        console.log(first_name, last_name, email, password);
        if (email === '' || password === '') return res.send('Faltan campos obligatorios')


        const newUser = {
            first_name,
            last_name,
            email,
            password,
            // role: "admin" // En caso de querer crear usuarios con el role: admin
        }

        const result = sessionService.createUser(newUser)
        // res.send({status: 'success', payload: newUser })
        res.redirect('/login');
    } catch (error) {
        res.send({status: 'error', error: error.message })
    }
})

router.get('/logout', (req, res) => {
    req.session.destroy(error => {
        if (error) {return res.status(401).send(error)}
        // res.send({status: 'success', message: 'Logout ok'})
    });
    res.redirect('/login');
});

router.get('/current', auth,(req, res) => {
    res.send('Datos sensibles')
})

export default router;