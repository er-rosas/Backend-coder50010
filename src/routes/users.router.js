import express from 'express';
import UserController from '../controllers/users.controller.js';
import { passportCall } from '../middleware/pasportCall.js';
import { authorization } from '../middleware/authentication.js';

const router = express.Router();

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

export default router;