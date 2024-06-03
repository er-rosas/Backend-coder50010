import express from 'express';
import UserController from '../../controllers/users.controller.js';
import { passportCall } from '../../middleware/pasportCall.js';
import { authorization } from '../../middleware/authentication.js';
import { uploader } from '../../utils/dirname.js';

const router = express.Router();

const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    getUsersPaginate,
    upgradeToPremiun,
    uploadProfile,
    uploadDocuments
} = new UserController()

router.get('/', passportCall('jwt'), authorization( ['USER_PREMIUM', 'ADMIN'] ), getUsers);
router.get('/:uid', getUser);
router.post('/', createUser);
router.put('/:uid', updateUser)
router.delete('/:uid', deleteUser)
router.get('/usersPaginate', getUsersPaginate);
router.get('/premiun/:uid', authorization( ['PUBLIC'] ), upgradeToPremiun);
router.post('/:uid/profile', uploader.single('profile'), uploadProfile);
router.post('/:uid/documents', uploader.single('documents'), uploadDocuments);

export default router;