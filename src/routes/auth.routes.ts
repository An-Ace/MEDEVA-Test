import { Router } from 'express';
import { userLogin, userRegister } from '../controllers/auth';

const router = Router();

router.post('/login', userLogin);
router.post('/register', userRegister);

export default router;
