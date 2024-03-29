import { userService } from "../services/index.js";
// import UserDTO from "../dto/user.dto.js";

class UserController{
    constructor(){
        this.service = userService
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
                } = await this.service.getPaginate(limit, pageQuery)
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
            const user = await this.service.get({_id: uid})
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
            const { first_name, last_name, email, password } = request.body

            const newUser = ({
                first_name,
                last_name,
                email,
                password })

            const result = await this.service.create(newUser)

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
            
            const result = await this.service.update(uid, body);
            
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
            const result = await this.service.delete(uid)
            responses.send('delete user')
        } catch (error) {
            console.log(error)
        }
    };
    getAllUsers = async (request, responses)=>{
        try {
            // const users = await this.service.gets()
            const users = await userService.getUsers()
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