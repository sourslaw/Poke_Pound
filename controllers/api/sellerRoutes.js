const router = require('express').Router();
const { Seller, Pokemon, Sale } = require('../../models');

// GET all users (backend request)
router.get('/', async (req,res) => {
	try {
		const sellerData = await Seller.findAll( { include: [  ] } );

		res.status(200).json(sellerData);

	} catch (err) {
		res.status(500).json(err);
	}
});

// back end get one seller by :id
router.get('/:id', async (req,res) => {
	try {
		const sellerData = await Seller.findAll( { include: [ {model:Pokemon, through: Sale, as:'pokes'} ] } );
		res.status(200).json(sellerData);
	} catch (err) {
		res.status(500).json(err);
	}
});





// CREATE new seller: 'api/seller'
router.post('/', async (req, res) => {
	try {
		const dbSellerData = await Seller.create({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
			// wallet: req.body.wallet
		});

		req.session.save(() => {
		req.session.user_id = dbSellerData.id;
		req.session.logged_in = true;

		res.status(200).json(dbSellerData);

		});

	} catch (err) {
		res.status(500).json(err);
	}
});

router.post('/login', async (req, res) => {
  try { // Find the user who matches the posted name 
    const sellerData = await Seller.findOne({ where: { name: req.body.name } });

	if (!sellerData) {
		res
		.status(400)
		.json({ message: 'Incorrect name or password, please try again' });
		return;
	}
	// Verify the posted password with the password store in the database
	const validPassword = await sellerData.checkPassword(req.body.password);

	if (!validPassword) {
		res
		.status(400)
		.json({ message: 'Incorrect name or password, please try again' });
		return;
	}
	// Create session variables based on the logged in user
	req.session.save(() => {
		req.session.user_id = sellerData.id;
		req.session.logged_in = true;
		
		res.json({ seller: sellerData, message: 'You are now logged in!' });
	});

	} catch (err) {
		res.status(400).json(err);
	}
});

router.post('/logout', (req, res) => {
	if (req.session.logged_in) {
	// Remove the session variables
	req.session.destroy(() => {
		res.status(204).end();
	});
	
	} else {
		res.status(404).end();
	}
});

module.exports = router;