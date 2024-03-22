import express from "express"
import { fork } from 'child_process'
import { sendMail } from "../../utils/sendEmail.js"

const router = express.Router()


router.get('/mail', (req, res) => {    
        const destinatario = 'er.rosas24@gmail.com'
        const subject = 'Email de prueba ecommer Coder'
        const html = '<div><h1>Este es un mail de prueba</h1></div>'
    
        sendMail(destinatario, subject, html)
        
        res.send('email enviado')
    })


// const router = Router()

// const operacionCompleja = () => {
//     let result = 0

//     for (let i = 0; i < 7e9; i++) {
//         result += i        
//     }

//     return result
// }

// router.get('/block', (req, res) => {
//     const result = operacionCompleja()

//     res.send({result})

// })


// router.get('/noblock', (req, res) => {
//     const child = fork('./src/routes/operacionCompleja.js')

//     child.send('Icicializa el cálculo por favor')

//     child.on('message', result => {
//         res.send({result})        
//     })


// })



// router.get('/session', (req, res) => {
//     if (req.session.counter) {
//         req.session.counter++
//         res.send(`Usted ha visitado el sito ${req.session.counter} veces.`)
//     } else {
//         req.session.counter = 1
//         res.send('Bienvenido a la página.')
//     }
// })

// router.get('/logout', (req, res) => {
//     req.session.destroy(error => {
//         if (error) return res.send('Logout error')
//         res.send({status: 'success', message: 'Logout ok'})
//     })
// })

// router.get('/setCookie', (req, res) => {
//     res.cookie('CoderCookie', 'esta es una cookie', {maxAge: 100000}).send('seteando cookie')
// })
// router.get('/getcookie', (req, res) => {
//     console.log(req.cookies)
//     res.send(req.cookies)
// })
// router.get('/setCookieSigned', (req, res) => {
//     res.cookie('CoderCookie', 'esta es una cookie firmada', {maxAge: 100000, signed: true}).send('seteando cookie')
// })
// router.get('/getcookieSigned', (req, res) => {
//     console.log(req.signedCookies)
//     res.send(req.signedCookies)
// })
// router.get('/deletecookie', (req, res) => {
//     res.clearCookie('CoderCookie').send('cookie borrada')
// })


export default router;