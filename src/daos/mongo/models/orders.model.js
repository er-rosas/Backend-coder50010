import mongoose from "mongoose";

const orderCollection = 'orders'

const orderSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'usuarios'
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'productos'
    }],
    totalprice: Number,
    created: Date
})

const orderModel = mongoose.model(orderCollection, orderSchema)

export default orderModel