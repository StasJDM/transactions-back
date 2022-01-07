import { uuid } from 'uuidv4';
import { TransactionInstance } from '../../db/models/transaction.model';
import { TransactionRepository } from '../repositories/transaction.repositories';
import { Return } from '../types';

export class TransactionService {
  public async getAllTransactionByUserId(userId: string): Promise<Return<TransactionInstance[]>> {
    const transactionRepository = new TransactionRepository();

    const [error, transactions] = await transactionRepository.getAllByUserId(userId);
    return [error, transactions];
  }

  public async getOutgoingTransactionByUserId(userId: string): Promise<Return<TransactionInstance[]>> {
    const transactionRepository = new TransactionRepository();

    const [error, transactions] = await transactionRepository.getOutgoingByUserId(userId);
    return [error, transactions];
  }

  public async getIncomingTransactionByUserId(userId: string): Promise<Return<TransactionInstance[]>> {
    const transactionRepository = new TransactionRepository();

    const [error, transactions] = await transactionRepository.getIncomingByUserId(userId);
    return [error, transactions];
  }

  public async getTransactionById(id: string): Promise<Return<TransactionInstance>> {
    const transactionRepository = new TransactionRepository();

    const [error, transaction] = await transactionRepository.getById(id);
    return [error, transaction];
  }

  public async createTransaction(
    id_from: string,
    id_to: string,
    amount: number,
    label: string,
  ): Promise<Return<TransactionInstance>> {
    const transactionRepository = new TransactionRepository();

    const id = uuid();

    const transaction = { id, id_from, id_to, amount, label };

    const [result, error] = await transactionRepository.create(transaction);
    return [result, error];
  }
}
