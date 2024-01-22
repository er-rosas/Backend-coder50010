import { connect } from 'mongoose'

export const connectDB = async ( ) => {
    try {
        // await connect('mongodb+srv://errosas24:---@cluster0.o1tsu31.mongodb.net/backendCoder50010?retryWrites=true&w=majority')
        await connect('mongodb://127.0.0.1:27017/backendCoder50010')
        console.log('base de datos connected')
        // await proudctModel.create({
        //     title: 'producto dos',
        //     description: 'esto es un producto dos',
        //     price: 7000,
        //     stock: 150
        // })
        
        // crear un carrito - buscamos el cart - guardamos un producto - actulaizamos el cart
        // await cartsModel.create({products: []})
        // const cart = await cartsModel.findById({_id: '65abec5d406ea13d7864da87'})
        // cart.products.push({product: '65abeb40fb62a4274117c6b4'})
        // let result = await cartsModel.findByIdAndUpdate({_id: '65abec5d406ea13d7864da87'}, cart)
        // console.log(result)

        // const cart = await cartsModel.findOne({_id: '65abec5d406ea13d7864da87'})
        // // buscar ahora los productos
        // console.log(cart.products)
    } catch (error) {
        console.log(error)
    }
}





        // const mongoose = require("mongoose")
        
        // exports.connectDB = async () => {
        //     try {
        //         // await mongoose.connect('mongodb://127.0.0.1:27017/backendCoder50010')
        //         console.log('Base de datos conectada')        
        //     } catch (error) {
        //         console.log(error)
        //     }
        // }