import cartModel from "./models/carts.model.js";
import ticketModel from "./models/ticket.model.js";

class CartManagerMongo {
    // constructor(){
    //     this.Cart = cartModel
    // }
    //get
    //getBy
    //create
    //update
    //deleteItem
    //delete

    // Obtener todos los productos en un carrito
    async getProducts(cartId) {
        const cart = await cartModel.findById(cartId);
        if (!cart) {
            throw new Error("Carrito no encontrado");
        }

        return cart.products;
    }

    async gets() {
        try {
            return await cartModel.find();
        } catch (error) {
            console.error(error);
        }
    }

    // Buscar un carrito por ID
    async getById(cid) {
        const cart = await cartModel.findById(cid);
        return cart;
    }

    // Crear un carrito
    async create(userEmail) {
        const cart = await cartModel.create({ userEmail, products: [] });
        return cart;
    }

    async update(cid, product){        
        try {
            const updatedCart = await cartModel.findOneAndUpdate(
                { _id: cid, 'products.product': product.id },
                { $inc: { 'products.$.quantity': product.quantity } },
                { new: true }
            )
        
            if (updatedCart) {
                // El producto ya estaba en el carrito, se actualizó su cantidad
                return updatedCart
            }
        
            // El producto no estaba en el carrito, se agrega con quantity en 1
            const newProductInCart = await cartModel.findOneAndUpdate(
                { _id: cid },
                { $push: { products: { product: product.id, quantity: product.quantity } } },
                { new: true, upsert: true }
            )
        
            return newProductInCart
        } catch (error) {
            return new Error('Error adding product to cart'+error)
        }

    }

    // Agregar un producto al carrito
    async addProduct(cartId, productId) {
        const cart = await cartModel.findById(cartId);
        if (!cart) {
            throw new Error("Carrito no encontrado");
        }

        cart.products.push({ product: productId });
        await cart.save();
        return cart;
    }

    // Actualizar un carrito
    async updateCart(cid, updatedCart) {
        const result = await cartModel.findByIdAndUpdate(cid, updatedCart, { new: true }).lean();
        if (!result) {
            throw new Error('Carrito no encontrado');
        }
        return result;
    }

    async removeProduct(cartId, productId) {
        console.log('Cart ID in removeProductFromCart:', cartId);
        console.log('Product ID in removeProductFromCart:', productId);
        const cart = await cartModel.findById(cartId);
        if (!cart) {
            throw new Error("Carrito no encontrado");
        }
        console.log(cart.products)
        const productIndex = cart.products.findIndex(item => item._id.toString() === productId);

        if (productIndex !== -1) {
            cart.products.splice(productIndex, 1);
            await cart.save();
            return cart;
        } else {
            throw new Error("Producto no encontrado en el carrito");
        }
    }

    // Actualizar la cantidad de un producto en el carrito
    async updateProductQuantity(cid, pid, quantity) {
        // const cart = await cartModel.findById(cartId);
        // if (!cart) {
        //     throw new Error("Carrito no encontrado");
        // }

        // const productIndex = cart.products.findIndex(item => item.product.toString() === productId);
        // // if (productIndex !== -1) {
        // //     // Asegurarse de que la cantidad sea un número válido
        // //     if (isNaN(quantity) || quantity < 0) {
        // //         throw new Error("La cantidad debe ser un número válido y mayor o igual a cero");
        // //     }
        // //     cart.products[productIndex].quantity = quantity;
        // //     await cart.save();
        // // }
        // cart.products[productIndex].quantity = quantity;
        // await cart.save();


        // return cart;

        //Encuentra el carrito por su ID
        const cart = await cartModel.findById(cid);
        console.log(cart + "--------------1--");
        console.log(cart.products + "---------1-5--");
        // Busca el índice del producto en el carrito
        //const productIndex = cart.products.findIndex(product => product.productId === productId);
        //console.log(productIndex);

        const index = cart.products.findIndex(
            (product) => product.product._id.toString() === pid
        );
        console.log(index);
        // Si el producto no está en el carrito, lanza un error
        if (index === -1) {
            throw new Error("Producto no encontrado en el carrito.");
        }

        // // Actualiza la cantidad del producto
        cart.products[index].quantity = quantity;

        // // Guarda el carrito actualizado
        const updatedCart = await cart.save();
        return updatedCart;
    }

    // Eliminar todos los productos del carrito
    async removeAllProducts(cartId) {
        const cart = await cartModel.findById(cartId);
        if (!cart) {
            throw new Error("Carrito no encontrado");
        }

        cart.products = [];
        await cart.save();
    }

    // Delete api/carts/:cid/products/:pid
    async deleteItem(cid, pid){
        try {
            return await cartModel.findOneAndUpdate(
                { _id: cid },
                { $pull: { products: { product: pid } } },
                { new: true }
            )
        } catch (error) {
            return new Error('Error deleting product from cart'+error)
        }
    }

    // vaciar carrito
    async delete(cid){
        try {
            // console.log(cid)
            return await cartModel.findOneAndUpdate(
                { _id: cid },
                { $set: { products: [] } },
                { new: true }
            )
        } catch (error) {
            return new Error('Error deleting cart'+ error)
        }
    }

    async createTicket(code, amount, purchaser) {
        const ticket = await ticketModel.create({
            code,
            // purchase_datetime: purchase
            amount,
            purchaser
        });
        return ticket;
    }
}

export default CartManagerMongo