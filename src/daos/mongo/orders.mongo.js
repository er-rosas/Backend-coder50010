import ticketModel from "./models/ticket.model.js"

class OrderDaoMongo {
    constructor(){
        this.ordersModel = ticketModel
    }

    async get(){
        try {
            return await this.ordersModel.find({})
        } catch (error) {
            return new Error(error)
        }
    }
    async getById(oid){
        try {
            return await this.ordersModel.findById(oid)
        } catch (error) {
            new Error(error)
        }
        
    }
    async create(newOrder){
        try {
            return await this.ordersModel.create(newOrder)            
        } catch (error) {
            new Error(error)
        }
    }
    async update(){}
    async delete(){}
}

export default OrderDaoMongo