import { Router } from 'express';
import { submitOrder } from '../contollers/ordersContorller.js';

const router = Router();

router.post('/', submitOrder);

export default router;
