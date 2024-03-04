import express from 'express';
import UserController from '../controllers/users.controller.js';
// import userModel from '../daos/models/user.model.js'
// import UserManagerMongo from '../daos/mongo/userManagerMongo.js';
import { passportCall } from '../middleware/pasportCall.js';
import { authorization } from '../middleware/authentication.js';


const router = express.Router();

// const userService = new UserManagerMongo()

const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    getAllUser
} = new UserController()

router.get('/', passportCall('jwt'), authorization( ['PUBLIC', 'USER_PREMIUM', 'ADMIN'] ), getUsers);
router.get('/:uid', getUser);
router.post('/', createUser);
router.put('/:uid', updateUser)
router.delete('/:uid', deleteUser)
router.get('/allusers', getAllUser);


//, passportCall('jwt'), authorization( ['USER_PREMIUM', 'ADMIN'] )
// router.get('/', async (request, responses)=>{
//         try {
//             const {limit = 5, pageQuery = 1} = request.query
//             const {
//                 docs,
//                 hasPrevPage, 
//                 hasNextPage,
//                 prevPage, 
//                 nextPage,
//                 page 
//                 } = await userService.getUsersPaginate(limit, pageQuery)
//                 responses.render('users', {
//                     users: docs,
//                     hasPrevPage, 
//                     hasNextPage,
//                     prevPage, 
//                     nextPage,
//                     page,
//                 })
//             } catch (error) {
//                 console.log(error)
//             }
//     })





    // .post('/', async (request, responses)=>{
    //     try {
    //         const { body } = request
    //         const result = await userService.createUser(body)

    //         responses.send({
    //             status: 'success',
    //             result
    //         })
    //     } catch (error) {
    //         console.log(error)
    //     }
    // })
    // .get('/:uid', async (request, responses)=>{
    //     try {
    //         const { uid } = request.params
    //         const user = await userService.getUser({_id: uid})
    //         responses.json({
    //             status: 'success',
    //             result: user
    //         })
    //     } catch (error) {
    //         console.log(error)
    //     }
    // })
    // .put('/:uid', async (request, responses)=>{
    //     try {
    //         const { uid } = request.params;
    //         const { body } = request;
            
    //         // Aquí podrías validar que hay datos en el body antes de intentar actualizar el usuario
            
    //         const result = await userService.updateUser(uid, body);
            
    //         responses.send({
    //             status: 'success',
    //             message: 'User updated successfully',
    //             result
    //         });
    //     } catch (error) {
    //         console.log(error);
    //         responses.status(500).send({
    //             status: 'error',
    //             message: 'An error occurred while updating the user'
    //         });
    //     }
    // })
    // .delete('/:uid', async (request, responses)=>{
    //     try {
    //         const {uid} = request.params
    //         const result = await userService.deleteUser(uid)
    //         responses.send('delete user')
    //     } catch (error) {
    //         console.log(error)
    //     }
    // })

export default router;