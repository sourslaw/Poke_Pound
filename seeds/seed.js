const sequelize = require('../config/connection');
const { Pokemon, User, Sale } = require('../models');

const userData = require('./userData.json');
const pokemonData = require('./pokemonData.json');
const saleData = require('./testsaleData.json');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

<<<<<<< HEAD
  await User.bulkCreate(userData, {
=======
  await Seller.bulkCreate(sellerData, {
>>>>>>> d96bacde482145d182ab3478c2868a15258a09c4
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
