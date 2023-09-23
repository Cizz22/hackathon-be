import { Router } from 'express';

import { createOrder, getOrders } from '../controllers/OrderController.js';



//Routes
const router = Router();

//Order
router.post('/', createOrder);
router.get('/', getOrders)

export default router;