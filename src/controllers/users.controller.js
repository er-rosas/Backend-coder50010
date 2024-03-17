import UserManagerMongo from '../daos/mongo/userDao.mongo.js';
// import { passportCall } from '../middleware/pasportCall.js';
// import { authorization } from '../middleware/authentication.js';

// const userService = new UserManagerMongo()

class UserController{
    constructor(){
        this.service = new UserManagerMongo()
    }
    getUsers = async (request, responses)=>{
        try {
            const {limit = 1, pageQuery = 1} = request.query
            const {
                docs,
                hasPrevPage, 
                hasNextPage,
                prevPage, 
                nextPage,
                page 
                } = await this.service.getUsersPaginate(limit, pageQuery)
                responses.render('users', {
                    users: docs,
                    hasPrevPage, 
                    hasNextPage,
                    prevPage, 
                    nextPage,
                    page,
                })
            } catch (error) {
                console.log(error)
            }
    };
    getUser = async (request, responses)=>{
        try {
            const { uid } = request.params
            const user = await this.service.getUser({_id: uid})
            responses.json({
                status: 'success',
                result: user
            })
        } catch (error) {
            console.log(error)
        }
    };
    createUser = async (request, responses)=>{
        try {
            const { body } = request
            const result = await this.service.createUser(body)

            responses.send({
                status: 'success',
                result
            })
        } catch (error) {
            console.log(error)
        }
    };
    updateUser = async (request, responses)=>{
        try {
            const { uid } = request.params;
            const { body } = request;
            
            // Aquí podrías validar que hay datos en el body antes de intentar actualizar el usuario
            
            const result = await this.service.updateUser(uid, body);
            
            responses.send({
                status: 'success',
                message: 'User updated successfully',
                result
            });
        } catch (error) {
            console.log(error);
            responses.status(500).send({
                status: 'error',
                message: 'An error occurred while updating the user'
            });
        }
    };
    deleteUser = async (request, responses)=>{
        try {
            const {uid} = request.params
            const result = await this.service.deleteUser(uid)
            responses.send('delete user')
        } catch (error) {
            console.log(error)
        }
    };
    getAllUsers = async (request, responses)=>{
        try {
            const users = await this.service.getUsers()
            responses.send({
                status: 'success',
                result: users
            })
        } catch (error) {
            console.log(error)
        }
    };
};

export default UserController;