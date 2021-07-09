const router = require('express').Router();
const { User, Pokemon, Sale } = require('../../models');

// GET all sales (backend request) 'api/sale'
router.get('/', async (req,res) => {
	try {
		// const saleData = await Sale.findAll( { include: [ {model: User}, {model: Pokemon} ] } );
		const saleData = await Sale.findAll( { include: [ {model: Pokemon}, {model: User} ] } );
		// const saleData = await Sale.findAll(  );

		res.status(200).json(saleData);

	} catch (err) {
		res.status(500).json(err);
	}
});
// GET ind. sale (backend request)
router.get('/:id', async (req, res) => {
	try {
	const saleData = await Sale.findByPk(req.params.id, {
		include: [ {model: Pokemon}, {model: User} ]

	});

	if (!saleData) {
		res.status(404).json({ message: 'No sale found with this id!' });
		return;
	}

	res.status(200).json(saleData);

	} catch (err) {
		res.status(500).json(err);
	}
});

// post a new SALE 'api/sale'
router.post('/', async (req, res) => {
	console.log('you are in the sale creation route')
	try {
		const dbSaleData = await Sale.create({
            name: req.body.name,
			price: req.body.price,
			attack: req.body.attack,
			defense: req.body.defense,
			description: req.body.description,
            pokemon_id: req.body.pokemon_id,
            user_id: req.session.user_id,
		});

		res.status(200).json(dbSaleData);

	} catch (err) {
		res.status(500).json(err);
	}
});

// update the sale
router.put('/:id', async (req, res) => {
	try {
		const saleData = await Sale.update(
			{
				sold: true,
				user_id: req.session.user_id,
				// User_id: req.body.User_id,
			},
			{
			where: {
				id: req.params.id,
			},
		}
	);
	
	res.status(200).json(saleData);
		
	} catch (err) {
    	res.status(500).json(err);
	}
});



module.exports = router;