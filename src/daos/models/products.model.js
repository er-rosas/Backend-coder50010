import {Schema, model} from 'mongoose'

const collection = 'products'

const ProductsSchema = new Schema({
    title: {
        type: String,
        index: true,
        },
    description: String, 
    code: String,
    price: Number,
    stock: Number,
    category: {
        type: String,
        index: true,
        },
    thumbnail: Array,
    status: {
        type: Boolean,
        default: true,
    },
    isActive: {
        type: Boolean,
        default: true
    }
})

const proudctModel = model(collection, ProductsSchema)

export default proudctModel