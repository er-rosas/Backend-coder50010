import userModel from "./models/user.model.js";

class UserManagerMongo {
    // async getUsersPaginate(limit=10, page=1){
    //     return await userModel.paginate({},{limit, page, lean: true})
    // }
    async gets(){
        return await userModel.find({isActive: true})
    }
    async get(uid){
        return await userModel.findOne({_id: uid})
    }
    async getBy(filter){
        return await userModel.findOne(filter)
    }
    async create(userNew){
        return await userModel.create(userNew)
    }
    async update(uid, userUpdate){
        return await userModel.findByIdAndUpdate({_id: uid}, userUpdate, {new: true})
    }
    // async update(uid, userUpdate){
    //     return await userModel.findByIdAndUpdate({_id: uid}, {userUpdate}, {new: true})
    // }
    async delete(uid){
        return await userModel.findByIdAndUpdate({_id: uid}, {isActive: false})
        // return await userModel.findByIdAndDelete({_id: uid})
    }
    async getPaginate(limit, pageQuery){
        return await userModel.paginate({isActive: true}, {limit, page: pageQuery, sort: {first_name: -1}, lean: true})
    }
};

export default UserManagerMongo;