'use strict';
import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '.';

interface UserAttributes {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  salt: string;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {
  createdAt?: string;
  updatedAt?: string;
}

const User = sequelize.define<UserInstance>('User', {
  id: {
    allowNull: false,
    autoIncrement: false,
    primaryKey: true,
    type: DataTypes.UUID,
    unique: true
  },
  email: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING
  },
  first_name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  last_name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  salt: {
    allowNull: false,
    type: DataTypes.STRING
  }
});

export default User;
