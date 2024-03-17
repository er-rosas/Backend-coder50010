import ClassRouter from './router';
import {
    renderInicio,
    renderProfile,
    renderDetalle,
    renderCart,
    renderProducts,
    renderLogin,
    renderRegister,
    renderRealTimeProducts
} from '../controllers/views.controller';

class ViewsRouter extends ClassRouter {
    init() {
        this.get('/',                 ['PUBLIC'], renderProducts);
        this.get('/inicio',           ['PUBLIC'], renderInicio);
        this.get('/profile',          ['PUBLIC'], renderProfile);
        this.get('/detalle/:pid',     ['PUBLIC'], renderDetalle);
        this.get('/carts/:cid',       ['USER'],   renderCart);
        this.get('/login',            ['PUBLIC'], renderLogin);
        this.get('/register',         ['PUBLIC'], renderRegister);
        this.get('/realtimeproducts', ['PUBLIC'], renderRealTimeProducts);
    }
}


// import express from 'express';

// const router = express.Router();

// router.get("/", async (req, res) => {
//     try {
//         res.render("index");
//     } catch (error) {
//         console.log(error);
//         res.render("Error");
//         return;
//     }
// });

// export default router;
export default new ViewsRouter();

















router.get('/', (req, res) => {
    res.redirect('/login');
});

router.get('/login', (req, res) => {
    res.render('login')
});

router.get('/register', (req, res) => {
    res.render('register')
});

// router.get('/products', async (req, res) => {
//     try {
//         const productsData = await productController.getProducts(req, res);
//         res.render('products', productsData, {
//                 product: docs,
//                 hasPrevPage,
//                 hasNextPage,
//                 prevPage,
//                 nextPage,
//                 page,
//                 uniqueCategories,
//                 user: userData
//             });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send('Internal Server Error');
//     }
// });

// export default router;