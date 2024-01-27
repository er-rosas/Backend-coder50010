import { connect } from 'mongoose'

export const connectDB = async ( ) => {
    try {
        await connect('mongodb+srv://errosas24:QvBOVYSG5ndTvKTr@cluster0.o1tsu31.mongodb.net/backendCoder50010?retryWrites=true&w=majority')
        // await connect('mongodb://127.0.0.1:27017/backendCoder50010')
        console.log('base de datos connected')
    } catch (error) {
        console.log(error)
    }
}