import {Schema, model} from 'mongoose';
import mongoosePaginate from "mongoose-paginate-v2";

const usersCollection = 'users'

const usersSchema = new Schema({
    first_name: {
        type: String,
        index: true
    },
    last_name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        // required: true
    }, 
    isActive: {
        type: Boolean,
        default: true
    },
    cartId: {
        type: Schema.Types.ObjectId,
        ref: 'carts'
    },
    role: {
        type: String,
        enum: ['user', 'user_premium','admin', 'PUBLIC', 'USER', 'USER_PREMIUM', 'ADMIN'],
        default: 'USER'
    }
})


usersSchema.plugin(mongoosePaginate);

const userModel = model(usersCollection, usersSchema);

export default userModel;