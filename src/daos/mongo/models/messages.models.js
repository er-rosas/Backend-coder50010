import { Schema, model } from "mongoose";

const messageCollection = "messages";

const messageSchema = new Schema({
    user: String,
    message: String,
    date: {
        type: Date,
        default: Date.now
    }
});

const messageModel = model(messageCollection, messageSchema);

export default messageModel;