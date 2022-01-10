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

  public async searchBySearchString(userId, searchString: string): Promise<Return<TransactionInstance[]>> {
    const transactionRepository = new TransactionRepository();

    const [error, transactions] = await transactionRepository.searchBySearchString(userId, searchString);
    return [error, transactions];
  }

  public async getAllTransactionAmountByUserId(
    userId: string,
  ): Promise<Return<{ incoming: number; outgoing: number }>> {
    const transactionRepository = new TransactionRepository();

    const [incomingError, incomingTransactionsAmountFields] = await transactionRepository.getIncomingByUserId(userId);
    const [outgoingError, outgoingTransactionsAmountFields] = await transactionRepository.getOutgoingByUserId(userId);
    if (incomingError) {
      return [incomingError, null];
    }
    if (outgoingError) {
      return [outgoingError, null];
    }
    const incomingTransactionsAmount = incomingTransactionsAmountFields.reduce((p, n) => p + n.amount, 0);
    const outgoingTransactionsAmount = outgoingTransactionsAmountFields.reduce((p, n) => p + n.amount, 0);

    return [null, { incoming: incomingTransactionsAmount, outgoing: outgoingTransactionsAmount }];
  }

  public async getOutgoingTransactionByUserId(userId: string): Promise<Return<TransactionInstance[]>> {
    const transactionRepository = new TransactionRepository();

    const [error, transactions] = await transactionRepository.getOutgoingByUserId(userId);
    return [error, transactions];
  }

  public async getMostAmountOutgoingTransactionByUserId(userId: string): Promise<Return<TransactionInstance[]>> {
    const transactionRepository = new TransactionRepository();

    const [error, transactions] = await transactionRepository.getOutgoingByUserId(userId, [['amount', 'DESC']], 5);
    return [error, transactions];
  }

  public async getOutgoingTransactionAmountByUserId(userId: string): Promise<Return<{ amount: number }>> {
    const transactionRepository = new TransactionRepository();

    const [error, transactionsAmountFields] = await transactionRepository.getOutgoingByUserId(userId);
    if (error) {
      return [error, null];
    }
    const transactionsAmount = transactionsAmountFields.reduce((p, n) => p + n.amount, 0);
    return [null, { amount: transactionsAmount }];
  }

  public async getIncomingTransactionByUserId(userId: string): Promise<Return<TransactionInstance[]>> {
    const transactionRepository = new TransactionRepository();

    const [error, transactions] = await transactionRepository.getIncomingByUserId(userId);
    return [error, transactions];
  }

  public async getMostAmountIncomingTransactionByUserId(userId: string): Promise<Return<TransactionInstance[]>> {
    const transactionRepository = new TransactionRepository();

    const [error, transactions] = await transactionRepository.getIncomingByUserId(userId, [['amount', 'DESC']], 5);
    return [error, transactions];
  }

  public async getIncomingTransactionAmountByUserId(userId: string): Promise<Return<{ amount: number }>> {
    const transactionRepository = new TransactionRepository();

    const [error, transactionsAmountFields] = await transactionRepository.getIncomingByUserId(userId);
    if (error) {
      return [error, null];
    }
    const transactionsAmount = transactionsAmountFields.reduce((p, n) => p + n.amount, 0);
    return [null, { amount: transactionsAmount }];
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
