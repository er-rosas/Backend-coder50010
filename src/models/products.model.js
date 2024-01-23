import {Schema, model} from 'mongoose'

const collection = 'products'

const ProductsSchema = new Schema({
    title: String,
    description: String, 
    code: String,
    price: Number,
    stock: Number,
    category: String,
    thumbnail: String,
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