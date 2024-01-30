import productsModel from "../models/products.model.js";

class ProductManagerMongo {
    async getProducts() {
        try {
            // limit = 10, pageQuery = 1, query, sort
            // let filter = { isActive: true };

            // if (query) {
            //     const queryParts = query.split(":");
            //     if (queryParts.length === 2) {
            //         const [field, value] = queryParts;
            //         filter[field] = value;
            //     } else {
            //         console.error("Formato de consulta no válido:", query);
            //     }
            // }
            // const { docs, hasPrevPage, hasNextPage, prevPage, nextPage, page } =
            //     await productsModel.paginate(filter, {
            //         limit,
            //         page: pageQuery,
            //         sort: { price: sort === "asc" ? 1 : -1 },
            //         lean: true,
            //     });
            // return { docs, hasPrevPage, hasNextPage, prevPage, nextPage, page };
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
                page: data.page
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