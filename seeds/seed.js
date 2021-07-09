const sequelize = require('../config/connection');
const { Pokemon, User, Sale } = require('../models');

const userData = require('./userData.json');
const pokemonData = require('./pokemonData.json');
const saleData = require('./testsaleData.json');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Pokemon.bulkCreate(pokemonData, {
    individualHooks: true,
    returning: true,
  });

  await Sale.bulkCreate(saleData, {
    individualHooks: true,
    returning: true,
  });


  process.exit(0);
};

seedDatabase();
