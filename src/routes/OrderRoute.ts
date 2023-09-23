import { Router } from 'express';
import multer from 'multer';
import { createOrder, getOrders, getOrder, getOrderByInvoice, updateOrderStatus } from '../controllers/OrderController.js';

const upload = multer({ dest: "uploads/" })

//Routes
const router = Router();

//Order
router.post('/', upload.single('design_img'), createOrder);
router.get('/', getOrders)
router.get('/:id', getOrder)
router.get('/invoice/:invoice', getOrderByInvoice)
router.put('/:id', updateOrderStatus)

export default router;