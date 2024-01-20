const mongoose = require("mongoose")

exports.connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://errosas24:QvBOVYSG5ndTvKTr@cluster0.o1tsu31.mongodb.net/backendCoder50010?retryWrites=true&w=majority')
        // await mongoose.connect('mongodb://127.0.0.1:27017/c50010')
        console.log('Base de datos conectada')        
    } catch (error) {
        console.log(error)
    }
}