import express from 'express';
import UserRouter from './user.router';
import AuthRouter from './auth.router';

const router = express.Router();

router.use('/auth', AuthRouter);
router.use('/users', UserRouter);

export default router;
