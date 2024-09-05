import { Router } from 'express';
import { verifySecToken } from '../middlewares/auth';
import { getAllTransactions, getMyTransactions } from '../controllers/transaction';

const router = Router();
router.get('/my-transactions', [verifySecToken, getMyTransactions]);
router.get('/all-transactions', [verifySecToken, getAllTransactions]);

export default router;
