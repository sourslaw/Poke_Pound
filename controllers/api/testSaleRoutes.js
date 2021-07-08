const router = require('express').Router();
const { Seller, Pokemon, Sale } = require('../../models');

// GET all sales (backend request)
router.get('/', async (req,res) => {
	try {
		// const saleData = await Sale.findAll( { include: [ {model: Seller}, {model: Pokemon} ] } );
		const saleData = await Sale.findAll( { include: [ {model: Pokemon}, {model:Seller} ] } );
		// const saleData = await Sale.findAll(  );

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
            seller_id: req.session.user_id,
		});

		res.status(200).json(dbSaleData);

	} catch (err) {
		res.status(500).json(err);
	}
});


module.exports = router;