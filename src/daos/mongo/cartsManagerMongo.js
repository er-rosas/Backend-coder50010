import cartsModel from "../models/carts.model.js";

class CartManagerMongo {
    // Crear un carrito
    async createCart() {
        const cart = await cartsModel.create({ products: [] });
        return cart;
    }

    // Buscar un carrito por ID
    async getCartById(cartId) {
        const cart = await cartsModel.findById(cartId);
        return cart;
    }

    // Agregar un producto al carrito
    async addProductToCart(cartId, productId) {
        const cart = await cartsModel.findById(cartId);
        if (!cart) {
            throw new Error("Carrito no encontrado");
        }

        cart.products.push({ product: productId });
        await cart.save();
        return cart;
    }

    // Obtener todos los productos en un carrito
    async getProductsInCart(cartId) {
        const cart = await cartsModel.findById(cartId);
        if (!cart) {
            throw new Error("Carrito no encontrado");
        }

        return cart.products;
    }

    // Actualizar un carrito
    async updateCart(cartId, updatedCart) {
        const result = await cartsModel.findByIdAndUpdate(cartId, updatedCart);
        return result;
    }
}

export default CartManagerMongo