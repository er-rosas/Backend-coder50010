import  mongoose from 'mongoose';
import productsModel from "../../models/products.model";

class ProductManagerMongo {
    async getProducts() {
    return await productsModel.find({ isActive: true });
    }

    async getProductById(pid) {
        //return await productsModel.findOne({ _id: pid });
        try {
            const product = await productsModel.findOne({ _id: mongoose.Types.ObjectId.createFromHexString(pid) });
        return product;
        } catch (error) {
            console.error(error);
            throw error; // Puedes manejar el error según tus necesidades
        }
    }

    async createproduct(newProduct) {
        return await productsModel.create(newProduct);
    }

    async deleteProduct(pid) {
        return await productsModel.findByIdAndUpdate(
            { _id: pid },
            { isActive: false }
        );
    }
}

export default ProductManagerMongo;