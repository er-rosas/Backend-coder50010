import userModel from "./models/user.model.js";

class UserManagerMongo {
    gets = async () => {
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
    async delete(uid){
        return await userModel.findByIdAndUpdate({_id: uid}, {isActive: false})
    }
    async getPaginate(limit, pageQuery){
        return await userModel.paginate({isActive: true}, {limit, page: pageQuery, sort: {first_name: -1}, lean: true})
    }
};

export default UserManagerMongo;