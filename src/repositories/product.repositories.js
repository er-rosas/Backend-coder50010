import productDTO from "../dto/product.dto.js"

class ProductRepository {
    constructor(productDao){
        this.dao = productDao
    }

    async getProducts(){
        try {
            return await this.dao.gets()            
        } catch (error) {
            return error
        }
    }
    async getProduct(pid){
        try {
            return await this.dao.getById(pid)            
        } catch (error) {
            return error
        }
    }
    async createProduct(newProduct){
        try {
            const newProductDTO = new productDTO(newProduct)
            return await this.dao.create(newProductDTO)            
        } catch (error) {
            return error
        }
    }
    async updateProduct(data){
        try {
            return await this.dao.update(data)            
        } catch (error) {
            return error
        }
    }
    //    updateProduct  = async (pid, productToUpdate) => await this.dao.create(pid, productToUpdate)
    async deleteProduct(pid){
        try {
            return await this.dao.delete(pid)            
        } catch (error) {
            return error
        }
    }
    async getUniqueCategories(){
        try {
            return await this.dao.getUniqueCategories()            
        } catch (error) {
            return error
        }
    }
    async getPaginate(limit, pageQuery, query){
        try {
            return await this.dao.getPaginate(limit, pageQuery, query)
        } catch (error) {
            return error
        }
    }
    async getProductStock(pid){
        try {
            const product = await this.dao.getById(pid);
            if (product) {
                return product.stock;
            } else {
                throw new Error("Producto no encontrado");
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async updateProductStock(pid, stock){
        try {
            // Obtener el producto por su ID
            const product = await this.dao.getById(pid);
            if (!product) {
                throw new Error("Producto no encontrado");
            }

            // Actualizar el stock del producto
            product.stock = stock;

            // Guardar los cambios en la base de datos
            await product.save();

            return product;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async getProductCode(code){
        try {
            return await this.dao.get({code})            
        } catch (error) {
            return error
        }
    }
}

export default ProductRepository