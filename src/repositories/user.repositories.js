import UserDTO from "../dto/user.dto.js"
// import UserManagerMongo from "../daos/mongo/user.mongo"
// const { UserDto } = require("../dto/userDto")

class UserRpositories {
    constructor(userDao){
        this.dao = userDao
    }

    async getUsers(){
        try {
            return await this.dao.gets()            
        } catch (error) {
            return error
        }
    }
    async getUser(filter){
        try {
            return await this.dao.getBy(filter)   
        } catch (error) {
            return error
        }
    }
    async createUser(newUser){
        try {
            const newUserDto = new UserDTO(newUser)
            return await this.dao.create(newUserDto)
        } catch (error) {
            return error
        }
    }
    async updateUser(uid, userToUpdate){
        try {
            return await this.dao.update(uid, userToUpdate)
        } catch (error) {
            return error
        }
    }
    async deleteUser(uid){
        try {
            return await this.dao.delete({_id: uid})
        } catch (error) {
            return error
        }
    }
    async getPaginate(limit, pageQuery){
        try {
            return await this.dao.getPaginate(limit, pageQuery)
        } catch (error) {
            return error
        }
    }
}

export default UserRpositories