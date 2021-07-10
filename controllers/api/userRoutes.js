const router = require('express').Router();
const { User, Pokemon, Sale } = require('../../models');

// GET all users (backend request)
router.get('/', async (req,res) => {
	try {
		const userData = await User.findAll( { include: [  ] } );

		res.status(200).json(userData);

	} catch (err) {
		res.status(500).json(err);
	}
});

// back end get one user by :id
router.get('/:id', async (req,res) => {
	try {
		const userData = await User.findByPk(req.params.id, { include: [ {model:Pokemon, through: Sale, as:'pokes'} ] } );
		res.status(200).json(userData);
	} catch (err) {
		res.status(500).json(err);
	}
});

// CREATE new user: 'api/user'
router.post('/', async (req, res) => {
	try {
		const dbuserData = await User.create({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
			wallet: req.body.wallet
		});

		req.session.save(() => {
		req.session.user_id = dbuserData.id;
		req.session.logged_in = true;

		res.status(200).json(dbuserData);

		});

	} catch (err) {
		res.status(500).json(err);
	}
});


// TEST update user (for updating wallet)
router.put('/:id', async (req, res) => {
	try {
		const userData = await User.update(
			{
				wallet: req.body.wallet,

			},
			{
			where: {
				id: req.params.id,
			},
		}
	);
	
	res.status(200).json(userData);
		
	} catch (err) {
    	res.status(500).json(err);
	}
});



router.post('/login', async (req, res) => {
  try { // Find the user who matches the posted name 
    const userData = await User.findOne({ where: { name: req.body.name } });

	if (!userData) {
		res
		.status(400)
		.json({ message: 'Incorrect name or password, please try again' });
		return;
	}
	// Verify the posted password with the password store in the database
	const validPassword = await userData.checkPassword(req.body.password);

	if (!validPassword) {
		res
		.status(400)
		.json({ message: 'Incorrect name or password, please try again' });
		return;
	}
	// Create session variables based on the logged in user
	req.session.save(() => {
		req.session.user_id = userData.id;
		req.session.logged_in = true;
		
		res.json({ user: userData, message: 'You are now logged in!' });
	});

	} catch (err) {
		res.status(400).json(err);
	}
});

// route for getting data about user to be used client side
router.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      res.json({
        email: req.user.email,
        id: req.user.id,
        wallet: req.user.wallet
      });
    }
  });


// route to create wallet
router.get('/wallet', async (req, res) => {
	console.log(hello);
	try {
		const wallet = await User.findByPk(req.params.id, 
			{
				include: [{ model: Pokemon }],
			  });
			  if (!wallet) {
				res.status(404).json({ message: 'Your wallet is empty!' });
			  	return;
			}
		
			res.status(200).json(wallet);
		  } catch (err) {
			res.status(500).json(err);
		  }
});


// PUT route for updating wallet amount
router.put('/wallet/:id', async (req, res) => {
	try {
		const updateWallet = await User.update(
			{user_id: req.body.user_id},
			{where: {id: req.params.id}}
		);
		res.status(200).json(updateWallet);
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