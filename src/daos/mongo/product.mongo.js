import { faker } from "@faker-js/faker";
import productsModel from "./models/products.model.js";

class ProductManagerMongo {
    // constructor(){
    //     this.product = productsModel
    // }
    //get
    //getById
    //create
    //update
    //remove
    async gets() {
        try {
            return await productsModel.find({ isActive: true });
        } catch (error) {
            console.error(error);
        }
    }
    async get(uid) {
        try {
            return await productsModel.findOne(uid);
        } catch (error) {
            console.error(error);
        }
    }

    async getById(pid) {
    try {
        return await productsModel.findOne({ _id: pid });
    } catch (error) {
        console.error(error);
    }
    }

    async create(newProduct) {
        try {
            return await productsModel.create(newProduct);
        } catch (error) {
            console.log(error);
        }
        }

    async update(data) {
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
                page: data.page
                }
            );
        } catch (error) {
            console.log(error);
        }
    }

    async delete(pid) {
        try {
            return await productsModel.findByIdAndUpdate(
            { _id: pid },
            { isActive: false }
            );
        } catch (error) {
            console.log(error);
        }
    }

    // Provisional hasta que tengamos una coleccion de categorias en la base de datos
    async getUniqueCategories() {
        try {
            const allProducts = await productsModel.find({ isActive: true });
            const allCategories = allProducts.map(product => product.category);
            const uniqueCategoriesSet = new Set(allCategories);
            const uniqueCategories = [...uniqueCategoriesSet];
            return uniqueCategories;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getPaginate (limit, pageQuery, query){
        return await productsModel.paginate(query, { limit, page: pageQuery, sort: { title: -1 }, lean: true });
    }
}

export default ProductManagerMongo;