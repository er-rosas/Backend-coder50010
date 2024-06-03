import { configObject, connectDB } from '../config/config.js';
import UserDaoMongo from './mongo/user.mongo.js';
import ProductDaoMongo from './mongo/product.mongo.js';
import OrderDaoMongo from './mongo/orders.mongo.js';
import CartDaoMongo from './mongo/cart.mongo.js';

let ProductDao;
let UserDao;
let OrderDao;
let CartDao;

const { persistence } = configObject;


switch (persistence) {

    case 'MONGO':
        connectDB(); // 2 llamada a la conexión
        const ProductDaoMongo = (await import('./mongo/product.mongo.js')).default
        ProductDao = ProductDaoMongo;
        
        const UserDaoMongo = (await import('./mongo/user.mongo.js')).default
        UserDao = UserDaoMongo;
        
        const OrderDaoMongo = (await import('./mongo/orders.mongo.js')).default
        OrderDao = OrderDaoMongo;
        
        const CartDaoMongo = (await import('./mongo/cart.mongo.js')).default
        CartDao = CartDaoMongo;
        break;
    case 'MEMORY':
        // Código para el caso de persistencia en memoria;
        break;
    case 'ARCHIVO':
        // Código para el caso de persistencia en archivo
        break;
    default:
        break;
}

export {
    ProductDao,
    UserDao,
    CartDao,
    OrderDao
};
