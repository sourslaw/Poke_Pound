const router = require('express').Router();
const userRoutes = require('./userRoutes');
const pokemonRoutes = require('./pokemonRoutes');
const saleRoutes = require('./testSaleRoutes.js');


router.use('/user', userRoutes);
router.use('/pokemon', pokemonRoutes);
router.use('/sale', saleRoutes);

module.exports = router;
