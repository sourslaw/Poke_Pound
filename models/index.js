const Seller = require('./Seller');
const Pokemon = require('./Pokemon');
const Sale = require('./Sale');


Seller.hasMany(Sale, {
  foreignKey: 'seller_id',
  // onDelete: 'CASCADE'
});

Sale.belongsTo(Seller, {
  foreignKey: 'seller_id'
});

Pokemon.hasMany(Sale, {
  foreignKey: 'pokemon_id'
});

Sale.belongsTo(Pokemon, {
  foreignKey: 'pokemon_id'
});

Pokemon.belongsToMany(Seller, {
  through: {
    model: Sale,
  },
  as: 'pokes'
});
Seller.belongsToMany(Pokemon, {
  through: {
    model: Sale,
  },
  as: 'pokes'
});

module.exports = { Seller, Pokemon, Sale };
