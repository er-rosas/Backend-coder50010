class ProductManager {
    constructor() {
        this.products = [];
        this.counterId = 1;
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.error("Todos los campos son obligatorios");
            return;
        }

        const productExists = this.products.some((product) => product.code === code);
        if (productExists) {
            console.log("Ya existe un producto con ese código");
            return;
        }

        const newProduct = {
            id: this.counterId,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        this.counterId++;
        this.products.push(newProduct);
        console.log("Producto agregado:", newProduct);
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find((product) => product.id === id);
        if (!product) {
            console.error("Producto no encontrado");
        }
        return product;
    }

    setCounterId(newCounterId) {
        this.counterId = newCounterId;
    }
}

const manager = new ProductManager();

manager.addProduct("Producto 1", "Descripción del Producto 1", 20, "imagen1", "abc123", 10);
manager.addProduct("Producto 2", "Descripción del Producto 2", 30, "imagen2", "abc124", 20);

console.log("Todos los productos:", manager.getProducts());
console.log("Producto con id 2:", manager.getProductById(2));
console.log("Producto con id 5:", manager.getProductById(3));