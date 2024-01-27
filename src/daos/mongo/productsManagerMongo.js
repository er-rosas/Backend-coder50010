import productsModel from "../models/products.model.js";

class ProductManagerMongo {
    async getProducts() {
        try {
            return await productsModel.find({ isActive: true });
        } catch (error) {
            console.error(error);
        }
    }

    async getProductById(pid) {
    try {
        return await productsModel.findOne({ _id: pid });
    } catch (error) {
        console.error(error);
    }
    }

    async createproduct(newProduct) {
        try {
            return await productsModel.create(newProduct);
        } catch (error) {
            console.log(error);
        }
        }

    async updateProduct(data) {
        try {
            return await productsModel.findByIdAndUpdate(
                { _id: data.idProduct },
                {
                title: data.title,
                description: data.description,
                code: data.code,
                price: data.price,
                stock: data.stock,
                category: data.category,
                thumbnail: data.thumbnail,
                }
            );
        } catch (error) {
            console.log(error);
        }
        }

    async deleteProduct(pid) {
        try {
            return await productsModel.findByIdAndUpdate(
            { _id: pid },
            { isActive: false }
            );
        } catch (error) {
            console.log(error);
        }
    }

    async getProductCode(code) {
        return await productsModel.findOne({ code });
    }
}

export default ProductManagerMongo;