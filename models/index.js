const Seller = require('./Seller');
const Pokemon = require('./Pokemon');

Seller.hasMany(Pokemon, {
  foreignKey: 'seller_id',
  // onDelete: 'CASCADE'
});

Pokemon.belongsTo(Seller, {
  foreignKey: 'seller_id'
});

module.exports = { Seller, Pokemon };
