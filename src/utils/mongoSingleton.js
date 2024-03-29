import mongoose from "mongoose"
import {logger} from '../utils/logger.js'

class MongoSingleton {
    static #instance
    constructor (url){
        mongoose.connect(url)
    }

    static getInstance(url){
        if(this.#instance){
            logger.info('Base de datos previamente conectada')
            return this.#instance
        }
        this.#instance = new MongoSingleton(url)
        logger.info('Base de datos conectada')
        return this.#instance
    }
}

export default MongoSingleton