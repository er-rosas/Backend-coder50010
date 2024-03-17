// import CartManagerMongo from "../daos/mongo/cartsDao.mongo"
// import ProductManagerMongo from "../daos/mongo/productsDao.mongo"
// import UserManagerMongo from "../daos/mongo/userDao.mongo"

// class viewsController {
//     constructor(){
//         this.cartDao = new CartManagerMongo()
//         this.productDao = new ProductManagerMongo()
//         this.userDao = new UserManagerMongo()
//     };
// }

import { productService, cartService, userService } from '../services';
import { logger } from '../middleware/logger';

class ViewsController {
    async renderInicio(req, res) {
        try {
            const products = [
                { title: 'Gorra rosa', price: 400, imageUrl: 'https://cdn.palbincdn.com/users/31244/images/GORRA-BASICA-JUNIOR-CUSTOMIZASHOPBF10B-COLOR-ROSA-1611838353.jpg', category: 'gorras' },
                { title: 'Gorra rosa', price: 350, imageUrl: 'https://cdn.palbincdn.com/users/31244/images/GORRA-BASICA-JUNIOR-CUSTOMIZASHOPBF10B-COLOR-ROSA-1611838353.jpg', category: 'gorras' },
                { title: 'Gorra rosa', price: 300, imageUrl: 'https://cdn.palbincdn.com/users/31244/images/GORRA-BASICA-JUNIOR-CUSTOMIZASHOPBF10B-COLOR-ROSA-1611838353.jpg', category: 'gorras' },
                { title: 'Gorra rosa', price: 200, imageUrl: 'https://cdn.palbincdn.com/users/31244/images/GORRA-BASICA-JUNIOR-CUSTOMIZASHOPBF10B-COLOR-ROSA-1611838353.jpg', category: 'gorras' },
                { title: 'Gorra rosa', price: 150, imageUrl: 'https://cdn.palbincdn.com/users/31244/images/GORRA-BASICA-JUNIOR-CUSTOMIZASHOPBF10B-COLOR-ROSA-1611838353.jpg', category: 'gorras' }
            ];

            let users = [{ email: 'fede@gmail.com', password: 'fede', role: 'admin' }];
            console.log('auth principal');
            let testUser = {
                name: 'Federico',
                last_name: 'Osandón',
                role: 'admin',
            };
            // req.session.user = testUser.name
            // req.session.admin = true
            res.status(200).render('index', {
                user: testUser,
                isAdmin: testUser.role === 'admin',
                products,
                showNav: true
                // style: 'index.css'
            });
        } catch (error) {
            logger.info(error);
        }
    }

    async renderProfile(req, res) {
        try {
            res.status(200).render('profile', {
                showNav: true
            });
        } catch (error) {
            logger.error(error);
        }
    }

    async renderCart(req, res) {
        try {
            const { cid } = req.params;

            const cart = await cartService.getCart(cid);
            console.log(cart.products);
            res.render('cart', {
                cart,
                showNav: true
            });
        } catch (error) {
            logger.error(error);
        }
    }

    async renderProducts(req, res) {
        try {
            res.status(200).render('products', {
                showNav: true
            });
        } catch (error) {
            logger.info(error);
        }
    }

    async renderDetalle(req, res) {
        try {
            const { pid } = req.params;
            const product = await productService.getProduct(pid);
            res.render('detalle', {
                product,
                showNav: true
            });
        } catch (error) {
            logger.error(error);
        }
    }

    async renderLogin(req, res) {
        try {
            res.status(200).render('login', {
                showNav: true
            });
        } catch (error) {
            logger.info(error);
        }
    }

    async renderRegister(req, res) {
        try {
            res.status(200).render('register', {
                showNav: true
            });
        } catch (error) {
            logger.info(error);
        }
    }

    async renderRealTimeProducts(req, res) {
        try {
            // console.log('realtime products')
            // return  res.send('realtime')
            // const products = await Product.getProducts()
            res.render('productsRealTime', {
                showNav: true
            });
        } catch (error) {
            console.log(error);
        }
    }
}

export default new ViewsController();
