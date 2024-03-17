// import { configObject, connectBD } from '../config/connectDB.js';
// import UserDaoMongo from '';
// import ProductDaoMongo from '';




// let UserDao
// let ProductDao
// let CartsDao


// // persistence MONGO
// switch (configObject.persistence) {
//     case 'FILE':
//         const UserDaoFile =  // require("./File/userManagerFile")
//         UserDao = UserDaoFile


//         break;
//     case 'MEMORY':
        
//         break;

//     default:
//         // la linea de abajo es para import from
//         // const UserDaoMongo = (async import('./Mongo/usersDao.mongo')).default
//         connectBD()

//         const UserDaoMongo = // require("./Mongo/usersDao.mongo")
//         UserDao = UserDaoMongo

//         const ProductDaoMongo = // require("./Mongo/productsDao.mongo")
//         ProductDao = ProductDaoMongo

//         break;
// }

// // module.exports = {
    // //     UserDao,
    // //     ProductDao
    // // }
    
    // export default {}
    
import config from '../config/connectDB.js';
import ProductDaoMongo from './mongo/product.mongo.js';
import UserDaoMongo from './mongo/user.mongo.js';
import OrderDaoMongo from './mongo/orders.mongo.js';
import CartDaoMongo from './mongo/cart.mongo.js';
import UserDaoMemory from './memory/user.memory.js';

let ProductDao;
let UserDao;
let CartDao;
let OrderDao;

const { persistence, connectDB } = config;

switch (persistence) {
    case 'MONGO':
        connectDB(); // 2 llamada a la conexión
        ProductDao = ProductDaoMongo;

        UserDao = UserDaoMongo;

        OrderDao = OrderDaoMongo;

        CartDao = CartDaoMongo;
        break;
    case 'MEMORY':
        UserDao = UserDaoMemory;
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
