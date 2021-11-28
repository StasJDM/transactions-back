'use strict';
import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '.';
import Transaction from './transaction.model';

interface UserAttributes {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  salt: string;
}

export type UserCreationAttributes = Optional<UserAttributes, 'id'>;

export interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {
  createdAt?: string;
  updatedAt?: string;
}

const User = sequelize.define<UserInstance>('User', {
  id: {
    allowNull: false,
    autoIncrement: false,
    primaryKey: true,
    type: DataTypes.UUID,
    unique: true,
  },
  email: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING,
  },
  first_name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  last_name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  salt: {
    allowNull: false,
    type: DataTypes.STRING,
  },
});

User.hasMany(Transaction, { sourceKey: 'id', foreignKey: 'id_from' });
User.hasMany(Transaction, { sourceKey: 'id', foreignKey: 'id_to' });

Transaction.belongsTo(User, { foreignKey: 'id_from' });
Transaction.belongsTo(User, { foreignKey: 'id_to' });

export default User;
