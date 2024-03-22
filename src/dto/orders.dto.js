class OrdersDTO {
    constructor(newOrders){
        this.code = newOrders.code
        this.amount = newOrders.amount
        this.purchaser = newOrders.purchaser
    }
}

export default OrdersDTO