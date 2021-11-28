import express from 'express';
import UserRouter from './user.router';
import AuthRouter from './auth.router';
import TransactionRouter from './transaction.router';

const router = express.Router();

router.use('/auth', AuthRouter);
router.use('/users', UserRouter);
router.use('/transactions', TransactionRouter);

export default router;
