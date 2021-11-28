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
    const { id_to, amount } = req.body;
    const [result, error] = await transactionService.createTransaction(id_from, id_to, amount);

    if (error) {
      return res.status(500).json(error);
    }
    res.json(result);
  }
}
