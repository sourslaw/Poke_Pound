const router = require('express').Router();
const sellerRoutes = require('./sellerRoutes');
const pokemonRoutes = require('./pokemonRoutes');
const saleRoutes = require('./testSaleRoutes.js');


router.use('/seller', sellerRoutes);
router.use('/pokemon', pokemonRoutes);
router.use('/sale', saleRoutes);

module.exports = router;
