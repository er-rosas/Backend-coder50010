import { 
    UserDao, 
    ProductDao, 
    OrderDao, 
    CartDao 
} from '../daos/factory.js'; // Daos - Manager

import ProductRepositories from '../repositories/product.repositories.js'; // Service
import UserRepositories from '../repositories/user.repositories.js';
import OrderRepositories from '../repositories/orders.repository.js';
import CartRepositories from '../repositories/cart.repositories.js';

const userService = new UserRepositories(new UserDao());
const productService = new ProductRepositories(new ProductDao());
const cartService = new CartRepositories(new CartDao());
const orderService = new OrderRepositories(new OrderDao());

export {
    userService,
    productService,
    cartService,
    orderService
};