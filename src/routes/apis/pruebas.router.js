import express from "express"
import { fork } from 'child_process'
import { sendMail } from "../../utils/sendEmail.js"
import { faker } from "@faker-js/faker"
import ProductManagerMongo from "../../daos/mongo/product.mongo.js"

const router = express.Router()

const productManager = new ProductManagerMongo()

const generateProducts = () => {
    return {
        //_id: {"$oid": faker.database.mongodbObjectId()},
        title: faker.commerce.productName(),
        code: faker.string.alphanumeric(6),
        desciption: faker.commerce.productDescription(),
        price: Number(faker.commerce.price()),
        stock: parseInt(faker.string.numeric()),
        category: faker.commerce.productAdjective(),
        thumbnails: [faker.image.url()],
        owner: faker.database.mongodbObjectId()
        //isActive: faker.datatype.boolean(1.0)
        // id: faker.database.mongodbObjectId(),
    }
}


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

router.get('/mockingproducts', async (req, res) => {
    try {
        let newProduct
        // for (let i = 0; i < 100; i++) {
        //     products.push(generateProducts())        
        // }
        const addedProducts = []
        let addedProduct
        for (let i = 0; i < 10; i++) {
            newProduct = generateProducts();
            console.log(newProduct)
            addedProduct = await productManager.create(newProduct);
            addedProducts.push(addedProduct);
        }
        res.send({
            status: '',
            payload: addedProducts
        })
    } catch (error) {
        return error
    }
    
}) 

router.get('/mail', (req, res) => {    
        const destinatario = 'er.rosas24@gmail.com'
        const subject = 'Email de prueba ecommer Coder'
        const html = '<div><h1>Este es un mail de prueba</h1></div>'
    
        sendMail(destinatario, subject, html)
        
        res.send('email enviado')
    })



router.get('/loggerTest', (req, res) => {
    // req.logger.warning('warning ejecutandose')
    // // req.logger.error('errror ejecutandose')

    // res.send('logger ejecutado')
    req.logger.fatal('Esto es un mensaje de fatal');
    req.logger.error('Esto es un mensaje de error');
    req.logger.warning('Esto es un mensaje de warning');
    req.logger.info('Esto es un mensaje de info');
    req.logger.debug('Esto es un mensaje de debug');
    req.logger.http('Esto es un mensaje de http');

    res.send('Logs probados');
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