import express from 'express';
// import CartManagerMongo from '../daos/mongo/cartsManagerMongo.js';
import cartsModel from '../daos/models/carts.model.js'

const router = express.Router()

router
    .get("/:cid", async (req, res) => {
        try {
            const { cid } = req.params;
            const cart = await cartsModel.findOne({ _id: cid });
            console.log(cart.products);
            res.send({
                status: "succes",
                payload: cart,
            });
        } catch (error) {
            res.status(500).send(`Error de servidor. ${error.message}`);
        }
    })

    .post("/", async (req, res) => {
        try {
            const result = await cartsModel.create({ products: [] });
            res.send({
                status: "succes",
                payload: result,
            });
        } catch (error) {
            res.status(500).send(`Error de servidor. ${error.message}`);
        }
    })

    .post("/:cid/product/:pid", async (req, res) => {
        try {
            const { cid, pid } = req.params;
            const cart = await cartsModel.findById({ _id: cid });
            cart.products.push({ product: pid });
            let result = await cartsModel.findByIdAndUpdate({ _id: cid }, cart);
            res.send({
                status: "succes",
                payload: result,
            });
        } catch (error) {
            res.status(500).send(`Error de servidor. ${error.message}`);
        }
    });

export default router;