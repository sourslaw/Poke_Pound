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
		res.status(404).json({ message: 'No blog found with this id!' });
		return;
	}

	res.status(200).json(pokemonData);

	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;