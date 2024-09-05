import { Router } from 'express';
import { verifySecToken } from '../middlewares/auth';
import { createOrder, checkOrderStatus, payOrder, getAllOrders, getMyOrders } from '../controllers/order';

const router = Router();
router.get('/order', [verifySecToken, createOrder]);
router.get('/payment', [verifySecToken, payOrder]); 
router.get('/status', [verifySecToken, checkOrderStatus]);
router.get('/my-orders', [verifySecToken, getMyOrders]);
router.get('/all-orders', [verifySecToken, getAllOrders]);

export default router;
