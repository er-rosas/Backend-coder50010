import mongoose from "mongoose";

const ticketCollection = 'tickets';

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true
    },
    purchase_datetime: {
        // type: Date,
        // default: Date.now
        type: String,
        default: getFormattedDate
    },
    amount: Number,
    purchaser: String
});

function getFormattedDate() {
    const now = new Date();
    return `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
}

const ticketModel = mongoose.model(ticketCollection, ticketSchema)

export default ticketModel