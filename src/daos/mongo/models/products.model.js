import {Schema, model} from 'mongoose';
import paginate from "mongoose-paginate-v2";

const collection = 'products'

const productsSchema = new Schema({
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
    thumbnails: {
        type: [String], // Indica que es un array de Strings
        default: [],    // Valor por defecto: un array vacío
    },
    status: {
        type: Boolean,
        default: true,
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

productsSchema.plugin(paginate);

const proudctModel = model(collection, productsSchema);

export default proudctModel;