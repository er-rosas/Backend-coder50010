import mongoose from "mongoose";

const ticketCollection = 'tickets';

const ticketSchema = new mongoose.Schema({
    code: {
        type: Number,
        unique: true
    },
    purchaser: String,
    purchase_datetime: {
        type: Date,
        default: Date.now
        // type: String,
        // default: getFormattedDate
    },
    // products: {
    //     type: [{
    //         product: {
    //             type: Schema.Types.ObjectId,
    //             ref: 'products'
    //         },
    //         quantity: {
    //             type: Number
    //         },
    //     }]
    // },
    amount: Number
});

function getFormattedDate() {
    const now = new Date();
    return `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
}

const ticketModel = mongoose.model(ticketCollection, ticketSchema)

export default ticketModel