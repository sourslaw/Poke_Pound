const router = require('express').Router();
const { Pokemon, User } = require('../../models');
const withAuth = require('../../utils/auth');

// GET all pokemon (backend api request: /api/pokemon/)
router.get('/', async (req,res) => {
	try {
    	const pokemonData = await Pokemon.findAll();
  
    	res.status(200).json(pokemonData);
    
    } catch (err) {
    	res.status(500).json(err);
    }
});
// GET ind. pokemon (backend api request: /api/pokemon/:id)
router.get('/:id', async (req, res) => {
	try {
	const pokemonData = await Pokemon.findByPk(req.params.id, {
		// include: [ { model: User }, ]
	});

	if (!pokemonData) {
		res.status(404).json({ message: 'No pokemon found with this id!' });
		return;
	}

	res.status(200).json(pokemonData);

	} catch (err) {
		res.status(500).json(err);
	}
});

// route to GET the price of the pokemon
router.get('/price', async (req, res) => {
	res.render('test');
	try {
	const pokemonPrice = await Pokemon.findOne({where: {price: req.body.price,}} 
		// include: [ { model: User }, ]
	);

	if (!pokemonPrice) {
		res.status(404).json({ message: 'No pokemon found for that price!' });
		return;
	}

	res.status(200).json(pokemonPrice);

	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;