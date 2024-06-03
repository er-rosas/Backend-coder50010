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
    },
    amount: Number
});


const ticketModel = mongoose.model(ticketCollection, ticketSchema)

export default ticketModel