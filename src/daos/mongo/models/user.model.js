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
        enum: ['user', 'admin', 'PUBLIC', 'USER_PREMIUM', 'ADMIN'],
        default: 'PUBLIC'
    }
})


usersSchema.plugin(mongoosePaginate);

const userModel = model(usersCollection, usersSchema);

export default userModel;