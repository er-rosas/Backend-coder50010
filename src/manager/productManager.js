const fs = require('fs');

class ProductManager {
    constructor() {
        this.path = './src/mockDB/products.json';
    }

    async addProduct(product) {
        try {
            // const { title, description, price, thumbnail, code, stock } = product;
            const { code } = product;
    
            // if (!title || !description || !price || !code || !stock) {
            //     console.log('Todos los campos son obligatorios');
            //     return;
            // }
    
            const products = await this.getProductsFromFile();
            
            const codeExists = products.some(p => p.code === code);
            if (codeExists) {
                console.log('Ya existe un producto con ese código');
                return;
            }
    
            const newProduct = {
                id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
                ...product
            };
    
            products.push(newProduct);
            await this.saveProductsToFile(products);
            console.log('Producto añadido correctamente:', newProduct);
            return newProduct;
        } catch (error) {
            console.log('Error al añadir el producto:', error);
        }
    }
    
    async getProducts() {
        try {
            return await this.getProductsFromFile();
        } catch (error) {
            console.log('Error al obtener los productos:', error);
        }
    }

    async getProductById(id) {
        try {
            const products = await this.getProductsFromFile();
            const product = products.find(p => p.id === id);
            if (!product) {
                console.log('Producto no encontrado');
                return;
            }
            return product;
        } catch (error) {
            console.log('Error obteniendo producto por ID:', error);
        }
    }

    async updateProduct(id, updatedFields) {
        try {
            let products = await this.getProductsFromFile();
            const index = products.findIndex(p => p.id === id);
            if (index === -1) {
                console.log('Producto no encontrado');
                return;
            }
            products[index] = { ...products[index], ...updatedFields };
            await this.saveProductsToFile(products);
            console.log('Producto actualizado correctamente:', products[index]);
        } catch (error) {
            console.log('Error actualizando el producto:', error);
        }
    }

    async deleteProduct(id) {
        try {
            let products = await this.getProductsFromFile();
            products = products.filter(p => p.id !== id);
            await this.saveProductsToFile(products);
            console.log('Producto eliminado correctamente');
        } catch (error) {
            console.log('Error al borrar el producto:', error);
        }
    }

    async getProductsFromFile() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT') {
                return [];
            } else {
                console.log('Error al leer el archivo:', error);
                return [];
            }
        }
    }

    async saveProductsToFile(products) {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
        } catch (error) {
            console.log('Error al escribir en el archivo:', error);
        }
    }
}

// Crear una instancia de ProductManager con la nueva ruta del archivo
// const manager = new ProductManager('../mockDB/products.json');

module.exports = ProductManager;


// manager.getProducts().then(console.log);

// Para realizar el testing:

// Los fui agregando de a uno:
// manager.addProduct({ title: "Producto 1", description: "Descripción...", price: 20, thumbnail: "ruta_imagen.jpg", code: "ABC123", stock: 10 });
// manager.addProduct({ title: "Producto 2", description: "Descripción...", price: 30, thumbnail: "ruta_imagen.jpg", code: "ABC124", stock: 10 });

// manager.getProducts().then(console.log);


// manager.getProductById(1).then(console.log);

// manager.updateProduct(1, { price: 40, stock: 15 });
// manager.getProducts().then(console.log);


// manager.deleteProduct(1);
// manager.getProducts().then(console.log);