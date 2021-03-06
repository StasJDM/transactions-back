import { Op, Sequelize } from 'sequelize';
import Transaction, { TransactionCreationAttributes, TransactionInstance } from '../../db/models/transaction.model';
import { Return } from '../types';

export class TransactionRepository {
  public async getAllByUserId(userId: string, order = [], limit = 20): Promise<Return<TransactionInstance[]>> {
    try {
      const transactions = await Transaction.findAll({
        where: Sequelize.or({ id_from: userId }, { id_to: userId }),
        order,
        limit,
      });
      return [null, transactions];
    } catch (error) {
      return [error, null];
    }
  }

  public async searchBySearchString(userId, searchString: string): Promise<Return<TransactionInstance[]>> {
    try {
      const transactions = await Transaction.findAll({
        where: {
          [Op.and]: [
            Sequelize.or(
              { label: { [Op.iLike]: `%${searchString}%` } },
              { amount: { [Op.iLike]: `%${searchString}%` } },
            ),
            Sequelize.or({ id_from: userId }, { id_to: userId }),
          ],
        },
      });
      return [null, transactions];
    } catch (error) {
      return [error, null];
    }
  }

  public async getOutgoingByUserId(userId: string, order = [], limit = 20): Promise<Return<TransactionInstance[]>> {
    try {
      const transactions = await Transaction.findAll({ where: { id_from: userId }, order, limit });
      return [null, transactions];
    } catch (error) {
      return [error, null];
    }
  }

  public async getIncomingByUserId(userId: string, order = [], limit = 20): Promise<Return<TransactionInstance[]>> {
    try {
      const transactions = await Transaction.findAll({ where: { id_to: userId }, order, limit });
      return [null, transactions];
    } catch (error) {
      return [error, null];
    }
  }

  public async getById(id: string): Promise<Return<TransactionInstance>> {
    try {
      const transaction = await Transaction.findOne({ where: { id } });
      return [null, transaction];
    } catch (error) {
      return [error, null];
    }
  }

  public async create(transaction: TransactionCreationAttributes): Promise<Return<TransactionInstance>> {
    try {
      const result = await Transaction.create(transaction);
      return [null, result];
    } catch (error) {
      return [error, null];
    }
  }
}
