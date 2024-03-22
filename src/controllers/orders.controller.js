import { orderService, cartService, productService } from '../services/index.js'
import { sendMail } from '../utils/sendEmail.js'


class OrdersController {
    async getOrders(req, res){
        try {
            let orders = await orderService.getOrders()
            res.status(200).send(orders)
        } catch (error) {
            console.log(error)
        }
    }
    async getOrder(req,res){
        const {oid} = req.params
        const order = await orderService.getOrder(oid)
        res.status(200).send(order)
    }

    async createOrder(req, res){
        const { cid } = req.params
        const cart = await cartService.getCart(cid);
    
        if (!cart) {
            return res.status(401).json({
                status: 'error',
                message: 'Cart not found'
            })
        }
    
        // Array de IDs de productos que no se pudieron comprar
        const productsNotPurchased = [];
        let totalPrice = 0; // Inicializamos totalPrice
    
        // Comprobamos la disponibilidad de cada producto en el carrito
        for (const item of cart.products) {
            const product = item.product;
            const quantity = item.quantity;
            const stock = await productService.getProductStock(product._id);
        
            if (quantity > stock) {
                // Si no hay suficiente stock, agregamos el ID del producto a la lista de no comprados
                productsNotPurchased.push(product._id);
            } else {
                // Si hay suficiente stock, restamos la cantidad comprada del stock del producto
                await productService.updateProductStock(product._id, stock - quantity);

                // Calculamos el precio total del producto y lo sumamos al totalPrice
                const productTotalPrice = product.price * quantity;
                totalPrice += productTotalPrice;
            }
        }
        
        // Genera un número aleatorio de 4 cifras
        const generateRandomCode = () => {
            return Math.floor(1000 + Math.random() * 9000);
        };

        // Utiliza la función para generar un código aleatorio
        const randomCode = generateRandomCode();

            // Creamos el ticket con los datos de la compra
        const ticket = await orderService.createOrder({
            code: randomCode,
            purchaser: req.user.email,//"fede@gmailcom",
            // products: cart.products,
            // products: [productId1, productId2],
            amount: totalPrice,
        });
    
        // Si hay productos no comprados, actualizamos el carrito para quitarlos
        if (productsNotPurchased.length > 0) {
            // Negando el !productsNotPurchased se quitarian lis productos que no se pudieron comprar, y se dejan los que si se pudieron.
            // Asi como esta ahora se ddejan los que no se pudieron compar y se quitan los otros
            const result = await cartService.updateCartProducts(cid, {products: cart.products.filter(item => productsNotPurchased.includes(item.product._id))});
            console.log(result)
        } else {
            // Si todos los productos se pudieron comprar, vaciamos el carrito
            await cartService.deleteCart(cid);
        }

        const destinatario = `${req.user.email}`
        const subject = `Purchase completed successfully`
        const html = `<div><h1>Este es un mail de prueba</h1></div><br><div><h4>Número de orden: ${randomCode}</h4></div>`
    
        sendMail(destinatario, subject, html)
    
        res.status(200).send({
            status: 'success',
            message: 'Purchase completed successfully',
            productsNotPurchased,
            ticket
        });
    }
    // async createOrder(req, res){
    //     try {
    //         const {body} = req
    //         console.log(body)
    //         const resp = await orderService.ceateOrder(body)
    //         console.log(resp)
    //         res.send(resp)
            
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    updateOrder(){}
    deleteOrder(){}
}

export default OrdersController
