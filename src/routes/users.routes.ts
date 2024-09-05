import { Router } from 'express';
import { deleteUser, getAllUser, getUserById, updateUser } from '../controllers/users';
import { isUserSelf, verifySecToken } from '../middlewares/auth';

const router = Router();

router.get('/', [verifySecToken, getAllUser]);
router.get('/:id', [verifySecToken, getUserById]);

router.patch('/', [isUserSelf, updateUser]);
router.delete('/', [verifySecToken, deleteUser]);

export default router;
