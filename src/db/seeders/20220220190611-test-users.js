'use strict';
const faker = require('faker');
const { uuid } = require('uuidv4');
const bcrypt = require('bcrypt');

const users = [...Array(50)].map(() => {
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

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('Users', users, {});
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
