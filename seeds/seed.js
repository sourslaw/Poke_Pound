const sequelize = require('../config/connection');
const { Pokemon, Seller } = require('../models');

const sellerData = require('./sellerData.json');
const pokemonData = require('./pokemonData.json');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Seller.bulkCreate(sellerData, {
    individualHooks: true,
    returning: true,
  });

  await Pokemon.bulkCreate(pokemonData, {
    individualHooks: true,
    returning: true,
  });


  process.exit(0);
};

seedDatabase();
