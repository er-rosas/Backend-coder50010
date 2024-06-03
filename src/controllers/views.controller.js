import { productService, cartService, userService } from '../services/index.js';

class ViewsController {
    async renderRedirect(req, res) {
        try {
            res.redirect('/login');
        } catch (error) {
            console.log(error);
            res.redirect("Error");
            return;
        }}

    async renderLogin(req, res) {
        try {
            res.status(200).render('login', {
                //showNav: true,
                style: 'login.css'
            });
        } catch (error) {
            // logger.info(error);
        }
    }

    async renderRegister(req, res) {
        try {
            res.status(200).render('register', {
                //showNav: true,
                style: 'register.css'
            });
        } catch (error) {
            // logger.info(error);
        }
    }

    async renderForgotPassword(req, res) {
        try {
            res.status(200).render('forgotPassword', {
                //showNav: true,
                style: 'forgotPassword.css'
            });
        } catch (error) {
            // logger.info(error);
        }
    }

    async renderIndex(req, res) {
        try {
            const userData = req.user;

            res.render('index', {
                showNav: true,
                showFooter: true,
                title: 'Inicio',
                user: userData,
                style: 'index.css'
            });
        } catch (error) {
            console.log(error);
            res.render("Error");
            return;
        }}

    async renderProfile(req, res) {
        try {
            const userData = req.user;
            console.log(userData);
            res.status(200).render('profile', {
                user: userData,
                showNav: true,
                showFooter: true,
                style: 'profile.css'
            });
        } catch (error) {
            // logger.error(error);
        }
    }

    async renderCart(req, res) {
        try {
            const { cid } = req.params;
            const cart = await cartService.getCart(cid);
            console.log(cart);

            const userData = req.user;

            const totalPrice = cart.products.reduce((total, item) => {
                return total + (item.product.price * item.quantity);
            }, 0);

            console.log('Total Price:', totalPrice);

            res.render("carts", { 
                cart,
                user: userData,
                totalPrice,
                showNav: true,
                showFooter: true,
                style: 'cart.css'
            });
    
        } catch (error) {
            res.status(500).send(`Error de servidor. ${error.message}`);
        }
    }

    async renderProducts(req, res) {
        try {
            // Verificar si la cookieToken no está presente en la solicitud
            if (!req.cookies.cookieToken) {
                // Redirigir al usuario al login
                return res.redirect('/login');
            }

            // Obtener los datos del usuario del objeto request
            const userData = req.user;
    
            const { limit = 9, pageQuery = 1, category } = req.query;
            const uniqueCategories = await productService.getUniqueCategories();
            const query = category ? { category, isActive: true } : { isActive: true };
            const {
                docs,
                hasPrevPage,
                hasNextPage,
                prevPage,
                nextPage,
                page
            } = await productService.getPaginate(limit, pageQuery, query);
            // const productsData = await productService.getProducts();
            console.log(docs);
            res.status(200).render('products', {
                showNav: true,
                showFooter: true,
                product: docs,
                hasPrevPage,
                hasNextPage,
                prevPage,
                nextPage,
                page,
                uniqueCategories,
                user: userData,
                style: 'products.css'
            });
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
            // logger.info(error);
        }
    }

    async renderDetail(req, res) {
        try {
            const { pid } = req.params;
            const productid = await productService.getProduct(pid);
            // console.log(productid)
            const userData = req.user;
    
            if (!productid) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }
    
            const product = productid.toObject();
            // console.log(product)
            res.render("productDetail", {
                showNav: true,
                showFooter: true,
                product, 
                user: userData,
                style: 'productDetail.css'
            });
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener el producto por ID' });
        }
    }

    async renderUsers(req, responses) {
        try {
            const {limit = 5, pageQuery = 1} = req.query
            const {
                docs,
                hasPrevPage,
                hasNextPage,
                prevPage,
                nextPage,
                page
                } = await userService.getPaginate(limit, pageQuery)

                console.log(docs);

                const userData = req.user;

                responses.render('users', {
                    showNav: true,
                    showFooter: true,
                    users: docs,
                    hasPrevPage, 
                    hasNextPage,
                    prevPage, 
                    nextPage,
                    page,
                    user: userData,
                    style: 'users.css'
                })
            } catch (error) {
                console.log(error)
            }
    };

    async renderRealTimeProducts(req, res) {
        try {
            const products = await productService.getProducts();
            const product = products.map((product) => ({
                ...product.toObject(),
                }));

            console.log(product);
            // console.log('GET / route called - Rendering realTimeProducts');
            const userData = req.user;
            console.log(userData);

            const owner = userData;
            console.log(owner.id + "     holaaa");

            res.render("realTimeProducts", {
                product,
                owner,
                user: userData,
                showNav: true,
                showFooter: true,
                style: 'realTimeProducts.css'
            });
        } catch (error) {
            console.log(error);
            res.render("Error al obtener la lista de productos!");
            return;
        }
    };
    async renderChat(req, res) {
        try {
            const userData = req.user;
            console.log(userData);
            res.render("chat", {
                user: userData,
                showNav: true,
                showFooter: true,
                style: 'chat.css'
            });
        } catch (error) {
            console.log(error);
            res.render("Error al obtener la lista de productos!");
            return;
        }
    }
};

export default ViewsController;