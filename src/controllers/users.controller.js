import { userService } from "../services/index.js";

class UserController{
    constructor(){
        this.service = userService
    }
    getUsers = async (request, responses)=>{
        try {
            // const users = await this.service.gets()
            const users = await this.service.getUsers()
            responses.send({
                status: 'success',
                result: users
            })
        } catch (error) {
            console.log(error)
        }
        
    };
    getUser = async (request, responses)=>{
        try {
            const { uid } = request.params
            const user = await this.service.getUser(uid)
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

            const result = await this.service.createUser(newUser)

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
    getUsersPaginate = async (request, responses)=>{
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
    upgradeToPremiun = async (req, res) => {
        try {
            
            const { uid } = req.params

            const user = await this.service.getUser(uid)
            
            let result = {};

            if (user.role === 'USER') {
                let body = {'role': 'USER_PREMIUM'}
                result = await this.service.updateUser(uid, body);
            } else {
                let body = {'role': 'USER'}
                result = await this.service.updateUser(uid, body);
            }

            
            res.status(200).send({
                status: 'success',

                result

            })
        } catch (error) {
            console.log(error)
        }       
    }

    uploadProfile = async (req, res) => {
        try {
            const { uid } = req.params
            // const { name } = req.body;
            const file = req.file
            console.log(file.length)

            if (!file) {
                return res.status(400).json({ 
                    status: 'error',
                    error: 'Faltan datos o archivos requeridos.' })
            }
        
            // Obtener el usuario y agregar los documentos
            const user = await userService.getUser(uid)
            console.log(user);
            if (!user) {
                return res.status(404).json({ error: 'Usuario no encontrado.' })
            }
            console.log(user)
        


            user.profileImg = [{
                name: file.filename,
                reference: file.destination,
            }];
        
            let  result = await userService.updateUser(uid, user);
        
            res.status(400).json({ 
                status: 'success', 
                payload: result
            })
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Ocurrió un error en el servidor.' })
        }
    }

    uploadDocuments = async (req, res) => {
        try {
            const { uid } = req.params
            // const { name } = req.body;
            const file = req.file
            console.log(file.length)
            // Validar si se cargaron los documentos requeridos
            // if (!files || (files.length < 3)) {
            if (!file) {
                return res.status(400).json({ 
                    status: 'error',
                    error: 'Faltan datos o archivos requeridos.' })
            }
        
            // Obtener el usuario y agregar los documentos
            const user = await userService.getUser(uid)
            console.log(user);
            if (!user) {
                return res.status(404).json({ error: 'Usuario no encontrado.' })
            }
            console.log(user)
        
            // Actualizar el usuario con los nuevos documentos y referencias generadas
            user.documents = user.documents || []
        


            user.documents.push({
                name: file.filename,
                reference: file.destination,
            })
        
            let  result = await userService.updateUser(uid, user);
        
            res.status(400).json({ 
                status: 'success', 
                payload: result
            })
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Ocurrió un error en el servidor.' })
        }
    }
};

export default UserController;