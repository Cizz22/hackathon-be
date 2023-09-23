import { Router } from 'express';

//Controllers
import { login, register, verifyAccess } from '../controllers/AuthController.js';

//Middlewares
import { verifyToken } from '../utils/verify-token.js';

//Routes
const router = Router();

//Auth
router.post('/register', register);
router.post('/login', login);
router.post('/verify-access', verifyToken, verifyAccess);

export default router;