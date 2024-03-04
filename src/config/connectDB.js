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


// export const connectDB = async ( ) => {
//     try {
//         await connect('mongodb+srv://errosas24:QvBOVYSG5ndTvKTr@cluster0.o1tsu31.mongodb.net/backendCoder50010?retryWrites=true&w=majority')
//         // await connect('mongodb://127.0.0.1:27017/backendCoder50010')
//         console.log('base de datos connected')
//     } catch (error) {
//         console.log(error)
//     }
// }