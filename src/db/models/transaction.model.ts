'use strict';
import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '.';

interface TransactionAttributes {
  id: string;
  id_from: string;
  id_to: string;
  amount: number;
}

export type TransactionCreationAttributes = Optional<TransactionAttributes, 'id'>;

export interface TransactionInstance
  extends Model<TransactionAttributes, TransactionCreationAttributes>,
    TransactionAttributes {
  createdAt?: string;
  updatedAt?: string;
}

const Transaction = sequelize.define<TransactionInstance>('Transaction', {
  id: {
    allowNull: false,
    autoIncrement: false,
    primaryKey: true,
    type: DataTypes.UUID,
    unique: true,
  },
  id_from: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  id_to: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  amount: {
    allowNull: false,
    type: DataTypes.DOUBLE,
  },
});

export default Transaction;
