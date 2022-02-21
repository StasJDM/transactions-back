'use strict';
const faker = require('faker');
const { uuid } = require('uuidv4');
const bcrypt = require('bcrypt');

const USERS_COUNT = 50;
const TRANSACTIONS_COUNT = 1000;

const users = [...Array(USERS_COUNT)].map(() => {
  const salt = bcrypt.genSaltSync(Number(process.env.HASH_ROUNDS));
  const password = bcrypt.hashSync('testPassword!23', salt);

  return {
    id: uuid(),
    email: faker.internet.email(),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    password,
    salt,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
});

const transactions = [...Array(TRANSACTIONS_COUNT)].map(() => {
  const id_from = faker.random.arrayElement(users).id;
  let id_to;
  do {
    id_to = faker.random.arrayElement(users).id;
  } while (id_from === id_to);

  return {
    id: uuid(),
    id_from,
    id_to,
    amount: faker.finance.amount(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
});

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.sequelize.transaction((dbTransaction) =>
      Promise.all([
        queryInterface.bulkInsert('Users', users, { transaction: dbTransaction }),
        queryInterface.bulkInsert('Transactions', transactions, { transaction: dbTransaction }),
      ]),
    );
  },
  down: async (queryInterface, Sequelize) => {
    return await queryInterface.sequelize.transaction((dbTransaction) =>
      Promise.all([
        queryInterface.bulkDelete('Transactions', null, { transaction: dbTransaction }),
        queryInterface.bulkDelete('Users', null, { transaction: dbTransaction }),
      ]),
    );
  },
};
