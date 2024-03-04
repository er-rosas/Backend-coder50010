import express from 'express';
// import ProductManagerMongo from '../daos/mongo/productsManagerMongo.js';
import ProductController from '../controllers/products.controller.js';
import { passportCall } from '../middleware/pasportCall.js';
import { authorization } from '../middleware/authentication.js';

const router = express.Router();

// const managerMongo = new ProductManagerMongo();

const { productDetail } = new ProductController()

router.get('/:pid', passportCall('jwt'), authorization( ['PUBLIC', 'USER_PREMIUM', 'ADMIN'] ), productDetail)

// router.get('/:pid', async (req, res) => {
//     try {
//         const { pid } = req.params;
//         const productid = await managerMongo.getProductById(pid);
//         // console.log(productid)

//         if (!productid) {
//             return res.status(404).json({ message: 'Producto no encontrado' });
//         }

//         const product = productid.toObject();
//         // console.log(product)
//         res.render("productDetail", { product });
//     } catch (error) {
//         res.status(500).json({ error: 'Error al obtener el producto por ID' });
//     }
// });

export default router;