import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { program } from '../utils/commander.js'
import MongoSingleton from '../utils/mongoSingleton.js'

const { mode } = program.opts()
console.log(mode)
dotenv.config({
    path: mode === 'development' ? './.env.development' : './.env.production'
})

export const configObject = {
    port: process.env.PORT || 8080,
    mongo_url: process.env.MONGO_URL,
    jwt_secret_Key: process.env.JWT_SECRET_KEY
}

export const connectDB = async () => {
    try {
        await MongoSingleton.getInstance(process.env.MONGO_URL)      
        // await mongoose.connect(process.env.MONGO_URL)
        // console.log('Base de datos conectada')           
    } catch (error) {
        console.log(error)
    }
}