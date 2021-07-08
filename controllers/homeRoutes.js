
const router = require('express').Router();
const { Pokemon, Seller } = require('../models');
const withAuth = require('../utils/auth');

// homepage route
router.get('/', async (req, res) => {
    try {
        res.render('homepage', { 
            logged_in: req.session.logged_in 
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

// get all pokemon
router.get('/buy', async (req, res) => {
    try {
        // Get all projects and JOIN with user data
        const pokemonData = await Pokemon.findAll({
            include: [
                {
                    model: Seller,
                },
            ],
        });
        // Serialize data so the template can read it
        const pokemons = pokemonData.map((pokemon) => pokemon.get({ plain: true }));
        // Pass serialized data and session flag into template
        res.render('buy', { 
            pokemons, 
            logged_in: req.session.logged_in 
        });
        
    } catch (err) {
        res.status(500).json(err);
    }
});




// LOGIN route. If the user is already logged in, redirect the request to another route
router.get('/login', (req, res) => {
	if (req.session.logged_in) {
    	res.redirect('/');
    	return;
	}

	res.render('login');
});

module.exports = router;
