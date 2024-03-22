class CartDTO {
    constructor(newCart){
        this.product = newCart.pid
        this.quantity = newCart.quantity
    }
}

export default CartDTO