
const router = require('express').Router();
const { Pokemon, User, Sale } = require('../models');
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

// get all pokemon that are for sale
router.get('/buy', async (req, res) => {
    try {
        // Get all projects and JOIN with user data
        // const saleData = await Sale.findAll({});
        const saleData = await Sale.findAll({ include: [ {model: Pokemon}, {model:User} ] });

        // Serialize data so the template can read it
        const sales = saleData.map((sale) => sale.get({ plain: true }));
        // Pass serialized data and session flag into template
        res.render('buy', { 
            sales, 
            logged_in: req.session.logged_in 
        });
        
    } catch (err) {
        res.status(500).json(err);
    }
});

// route to create a sale
router.get('/sell', withAuth, async (req, res) => {
	try { // Find the logged in user based on the session ID
		const userData = await User.findByPk(req.session.user_id, {
			attributes: { exclude: ['password'] },
			include: [{ model: Sale }],
		});

    	const user = userData.get({ plain: true });

		res.render('sell', {
			...user,
			logged_in: true
		});

	} catch (err) {
		res.status(500).json(err);
	}
});

// get all SALES buy User ID


// route to User dashboard
router.get('/dashboard', withAuth, async (req, res) => {
	try { // Find the logged in user based on the session ID
		const userData = await User.findByPk(req.session.user_id, {
			attributes: { exclude: ['password'] },
			include: [ {model:Pokemon, through: Sale, as:'pokes'} ],
		});

    	const user = userData.get({ plain: true });

		res.render('dashboard', {
			...user,
			logged_in: true
		});

	} catch (err) {
		res.status(500).json(err);
	}
});


// SALE TEST route
// router.get('/sell', async (req, res) => {
//     try {
//         // Get all projects and JOIN with user data
//         const saleData = await Sale.findAll({ include: [ {model: Pokemon}, {model:User} ] });
//         // Serialize data so the template can read it
//         const sales = saleData.map((sale) => sale.get({ plain: true }));
//         // Pass serialized data and session flag into template
//         res.render('sell', { 
//             sales, 
//             logged_in: req.session.logged_in 
//         });
        
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });




// LOGIN route. If the user is already logged in, redirect the request to another route
router.get('/login', (req, res) => {
	if (req.session.logged_in) {
    	res.redirect('/');
    	return;
	}

	res.render('login');
});

module.exports = router;
