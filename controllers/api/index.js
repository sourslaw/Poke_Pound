const router = require('express').Router();
const sellerRoutes = require('./sellerRoutes');
const pokemonRoutes = require('./pokemonRoutes');

router.use('/seller', sellerRoutes);
router.use('/pokemon', pokemonRoutes);

module.exports = router;
