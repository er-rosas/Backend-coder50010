import mongoose from "mongoose"

class MongoSingleton {
    static #instance
    constructor (url){
        mongoose.connect(url)
    }

    static getInstance(url){
        if(this.#instance){
            console.log('Base de datos previamente conectada')
            return this.#instance
        }
        this.#instance = new MongoSingleton(url)
        console.log('Base de datos conectada')
        return this.#instance
    }
}

export default MongoSingleton