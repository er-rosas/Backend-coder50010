import express from "express"
import { fork } from 'child_process'
import { sendMail } from "../../utils/sendEmail.js"
import { faker } from "@faker-js/faker"

const router = express.Router()

const generateProducts = () => {
    return {
        _id: {"$oid": faker.database.mongodbObjectId()},
        title: faker.commerce.productName(),
        code: faker.string.alphanumeric(6),
        desciption: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        stock: parseInt(faker.string.numeric()),
        image: [faker.image.url()],
        isActive: faker.datatype.boolean(1.0)
        
        // id: faker.database.mongodbObjectId(),
    }
}
// {"_id":{"$oid":"65b814c886c75ad230e29334"},"title":"iPhone 15","description":"Descripcion del Iphone 15","code":"COD001","price":{"$numberInt":"1000"},"stock":{"$numberInt":"0"},"category":"apple","thumbnails":[],"status":true,"isActive":true,"__v":{"$numberInt":"0"}}

// title: {
//     type: String,
//     index: true,
//     },
// description: String, 
// code: String,
// price: Number,
// stock: Number,
// category: {
//     type: String,
//     index: true,
//     },
// thumbnails: {
//     type: [String], // Indica que es un array de Strings
//     default: [],    // Valor por defecto: un array vacío
// },
// status: {
//     type: Boolean,
//     default: true,
// },
// isActive: {
//     type: Boolean,
//     default: true
// }

// const generateUser = () => {
//     let numberOfProducts = parseInt(faker.string.numeric(1, { bannedDigits: ['0']}))
//     let products = []

//     for (let i = 0; i < numberOfProducts; i++) {
//         products.push(generateProducts())
        
//     }
//     return {
//         id: faker.database.mongodbObjectId(),
//         first_name: faker.person.firstName(),
//         last_name: faker.person.lastName(),
//         sex: faker.person.sex(),
//         birthDate: faker.date.birthdate(),
//         phone: faker.phone.number(),
//         image: faker.image.avatar(),
//         email: faker.internet.email(),
//         products     
//     }
// }

router.get('/mockingproducts', (req, res) => {
    let products = []
    for (let i = 0; i < 100; i++) {
        products.push(generateProducts())        
    }
    res.send({
        status: '',
        payload: products
    })
}) 

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