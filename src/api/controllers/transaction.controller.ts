import { Request, Response } from 'express';
import { TransactionService } from '../services/transaction.service';

export class TransactionController {
  public static async getAllUserTransactions(req: Request, res: Response): Promise<Response | void> {
    const transactionService = new TransactionService();

    const [error, transactions] = await transactionService.getAllTransactionByUserId(req.user.id);

    if (error) {
      return res.status(500).json(error);
    }
    res.json(transactions);
  }

  public static async getAllUserTransactionsAmount(req: Request, res: Response): Promise<Response | void> {
    const transactionService = new TransactionService();

    const [error, transactions] = await transactionService.getAllTransactionAmountByUserId(req.user.id);

    if (error) {
      return res.status(500).json(error);
    }
    res.json(transactions);
  }

  public static async getOutgoingUserTransactions(req: Request, res: Response): Promise<Response | void> {
    const transactionService = new TransactionService();

    const [error, transactions] = await transactionService.getOutgoingTransactionByUserId(req.user.id);

    if (error) {
      return res.status(500).json(error);
    }
    res.json(transactions);
  }

  public static async getOutgoingUserTransactionsAmount(req: Request, res: Response): Promise<Response | void> {
    const transactionService = new TransactionService();

    const [error, transactionsAmount] = await transactionService.getOutgoingTransactionAmountByUserId(req.user.id);

    if (error) {
      return res.status(500).json(error);
    }
    res.json(transactionsAmount);
  }

  public static async getIncomingUserTransactions(req: Request, res: Response): Promise<Response | void> {
    const transactionService = new TransactionService();

    const [error, transactions] = await transactionService.getIncomingTransactionByUserId(req.user.id);

    if (error) {
      return res.status(500).json(error);
    }
    res.json(transactions);
  }

  public static async getIncomingUserTransactionsAmount(req: Request, res: Response): Promise<Response | void> {
    const transactionService = new TransactionService();

    const [error, transactionsAmount] = await transactionService.getIncomingTransactionAmountByUserId(req.user.id);

    if (error) {
      return res.status(500).json(error);
    }
    res.json(transactionsAmount);
  }

  public static async getTransactionById(req: Request, res: Response): Promise<Response | void> {
    const transactionService = new TransactionService();

    const [error, transaction] = await transactionService.getTransactionById(req.params.id);

    if (error) {
      return res.status(500).json(error);
    }
    res.json(transaction);
  }

  public static async createTransaction(req: Request, res: Response): Promise<Response | void> {
    const transactionService = new TransactionService();

    const id_from = req.user.id;
    const { id_to, amount, label } = req.body;
    const [error, result] = await transactionService.createTransaction(id_from, id_to, amount, label);

    if (error) {
      return res.status(500).json(error);
    }
    res.json(result);
  }
}
