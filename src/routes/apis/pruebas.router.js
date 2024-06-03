import express from "express"
import { sendMail } from "../../utils/sendEmail.js"
import { faker } from "@faker-js/faker"
import ProductManagerMongo from "../../daos/mongo/product.mongo.js"

const router = express.Router()

const productManager = new ProductManagerMongo()

const generateProducts = () => {
    return {
        title: faker.commerce.productName(),
        code: faker.string.alphanumeric(6),
        description: faker.commerce.productDescription(),
        price: Number(faker.commerce.price()),
        stock: parseInt(faker.string.numeric()),
        category: faker.commerce.productAdjective(),
        thumbnails: [faker.image.url()],
        owner: faker.database.mongodbObjectId()
    }
}

router.get('/mockingproducts', async (req, res) => {
    try {
        let newProduct
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
    req.logger.fatal('Esto es un mensaje de fatal');
    req.logger.error('Esto es un mensaje de error');
    req.logger.warning('Esto es un mensaje de warning');
    req.logger.info('Esto es un mensaje de info');
    req.logger.debug('Esto es un mensaje de debug');
    req.logger.http('Esto es un mensaje de http');

    res.send('Logs probados');
})

export default router;