import {Schema, model} from 'mongoose';

const collection = 'carts'

const CartsSchema = new Schema({
    products: {
        type: [{
            product: {
                type: Schema.Types.ObjectId,
                ref: 'products'
            },
            quantity: {
                type: Number, // Indica que es un array de Strings
                default: 1,    // Valor por defecto: un array vacío
            },
        }]
    }
})

CartsSchema.pre('findOne', function () {
    this.populate('products.product')
})

const cartsModel = model(collection, CartsSchema)

export default cartsModel;