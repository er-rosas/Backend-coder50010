import OrdersDTO from "../dto/orders.dto.js"

class OrderService {
    constructor(orderDao){
        this.orderDao = orderDao
    }

    async getOrders(){
        return await this.orderDao.get()
    }
    async getOrder(oid){
        return await this.orderDao.getById(oid)
    }
    async createOrder(newOrder){
        const newOrderDTO = new OrdersDTO(newOrder)
        return await this.orderDao.create(newOrderDTO)
    }
}

export default OrderService