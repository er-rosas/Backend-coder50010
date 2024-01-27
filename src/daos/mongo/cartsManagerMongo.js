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


// class CartManagerMongo {
//     // crear un carrito - buscamos el cart - guardamos un producto - actulaizamos el cart
//     // await cartsModel.create({products: []})
//     // const cart = await cartsModel.findById({_id: '65abec5d406ea13d7864da87'})
//     // cart.products.push({product: '65abeb40fb62a4274117c6b4'})
//     // let result = await cartsModel.findByIdAndUpdate({_id: '65abec5d406ea13d7864da87'}, cart)
//     // console.log(result)

//     // const cart = await cartsModel.findOne({_id: '65abec5d406ea13d7864da87'})
//     // // buscar ahora los productos
//     // console.log(cart.products)
//     async getUsers(){
//         return await userModel.find({})
//     }
//     async getUser(uid){
//         return await userModel.findOne({_id: uid})
//     }
//     async createUser(userNew){
        
//         return await userModel.create(userNew)
//     }
//     async updateUser(){}
//     async deleteUser(){}
// }

export default CartManagerMongo