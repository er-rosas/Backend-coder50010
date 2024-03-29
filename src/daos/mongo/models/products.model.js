import {Schema, model} from 'mongoose';
import paginate from "mongoose-paginate-v2";

const collection = 'products'

const productsSchema = new Schema({
    title: {
        type: String,
        index: true,
        },
    code: String,
    description: String, 
    price: Number,
    stock: Number,
    category: {
        type: String,
        index: true,
        },
    thumbnails: {
        type: [String], // Indica que es un array de Strings
        default: [],    // Valor por defecto: un array vacío
    },
    isActive: {
        type: Boolean,
        default: true
    },
    atCreate: {
        type: Date,
        default: new Date()
    }
});

// // para sacar las propiedades de un producto
// productsSchema.methods.toJSON = function(){
//     const {__v, isActive, ...data} = this.toObject()
//     return data
// }


productsSchema.plugin(paginate);

const proudctModel = model(collection, productsSchema);

export default proudctModel;