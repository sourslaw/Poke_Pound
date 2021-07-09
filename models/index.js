const User = require('./User');
const Pokemon = require('./Pokemon');
const Sale = require('./Sale');


User.hasMany(Sale, {
  foreignKey: 'user_id',
  // onDelete: 'CASCADE'
});

Sale.belongsTo(User, {
  foreignKey: 'user_id'
});

Pokemon.hasMany(Sale, {
  foreignKey: 'pokemon_id'
});

Sale.belongsTo(Pokemon, {
  foreignKey: 'pokemon_id'
});

Pokemon.belongsToMany(User, {
  through: {
    model: Sale,
  },
  as: 'pokes'
});
User.belongsToMany(Pokemon, {
  through: {
    model: Sale,
  },
  as: 'pokes'
});

module.exports = { User, Pokemon, Sale };
