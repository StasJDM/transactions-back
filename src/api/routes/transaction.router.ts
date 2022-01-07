import express from 'express';
import { TransactionController } from '../controllers/transaction.controller';
import { checkJwtToken } from '../middlewares';
import { createTransactionValidator, getTransactionByIdValidator } from '../validators';

const router = express.Router();

router.get('/', checkJwtToken, TransactionController.getAllUserTransactions);

router.get('/outgoing', checkJwtToken, TransactionController.getOutgoingUserTransactions);

router.get('/outgoing/amount', checkJwtToken, TransactionController.getOutgoingUserTransactionsAmount);

router.get('/incoming', checkJwtToken, TransactionController.getIncomingUserTransactions);

router.get('/incoming/amount', checkJwtToken, TransactionController.getIncomingUserTransactionsAmount);

router.get('/:id', checkJwtToken, getTransactionByIdValidator, TransactionController.getTransactionById);

router.post('/', checkJwtToken, createTransactionValidator, TransactionController.createTransaction);

export default router;
