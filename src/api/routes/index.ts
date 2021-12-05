import express from 'express';
import UserRouter from './user.router';
import AuthRouter from './auth.router';
import TransactionRouter from './transaction.router';
import elasticClient from '../search/elasticsearch.config';

const router = express.Router();

router.get('/check-search', async (req, res) => {
  const info = await elasticClient.info();
  res.send(info);
});

router.use('/auth', AuthRouter);
router.use('/users', UserRouter);
router.use('/transactions', TransactionRouter);

export default router;
