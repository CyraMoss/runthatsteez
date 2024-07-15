import { Router } from 'express';
import productRoutes from './products';
import userRoutes from './users';

const router = Router();

router.use('/product', productRoutes);
router.use('/user', userRoutes);

export default router;
