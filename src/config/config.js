import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { program } from '../utils/commander.js'
import MongoSingleton from '../utils/mongoSingleton.js'
import { logger } from '../utils/logger.js'

const { mode } = program.opts()
//console.log(mode)

const enviroment = mode || "development"

logger.info(mode)

dotenv.config({
    path: enviroment === 'development' ? './.env.development' : './.env.production'
})

export const configObject = {
    port: process.env.PORT || 8080,
    mongo_url: process.env.MONGO_URL,
    jwt_secret_Key: process.env.JWT_SECRET_KEY,
    persistence: process.env.PERSISTENCE, // || "MONGO",
    gmail_user: process.env.GMAIL_USER_APP,
    gmail_pass: process.env.GMAIL_PASS_APP,
    logger_level_console: process.env.LOGGER_LEVEL_CONSOLE,
    logger_level_file: process.env.LOGGER_LEVEL_FILE
}

export const connectDB = async () => {
    try {
        await MongoSingleton.getInstance(process.env.MONGO_URL)      
        // await mongoose.connect(process.env.MONGO_URL)
        // console.log('Base de datos conectada')           
    } catch (error) {
        //console.log(error)
        logger.error(error)
    }
}