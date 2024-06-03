import {Schema, model} from 'mongoose';
import mongoosePaginate from "mongoose-paginate-v2";
//import { profile } from 'winston';

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
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'premium'],
        default: 'user'
    },
    profileImg: [
        {
            name: String,
            reference: String
        }
    ],
    documents: [
        {
            name: String,
            reference: String
        }
    ],    
    last_connection: {
        type: Date,
        default: Date.now
    }
})

usersSchema.pre('findOne', function() {
    this.populate('cartId')
});

usersSchema.plugin(mongoosePaginate);

const userModel = model(usersCollection, usersSchema);

export default userModel;