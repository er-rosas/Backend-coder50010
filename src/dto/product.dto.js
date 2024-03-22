class ProductDTO {
    constructor(newProduct){
        this.title = newProduct.title
        this.description = newProduct.description
        this.code = newProduct.code
        this.price = newProduct.price
        this.stock = newProduct.stock
        this.category = newProduct.category
        this.thumbnails = newProduct.thumbnails
    }
}

export default ProductDTO