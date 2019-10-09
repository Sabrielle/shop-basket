const Product = require('../models/Product');

module.exports = {

	getAll: async (req, res) => {
		try {
			let products = await Product.find();
			res.json(products);

		} catch (error) {
			res.status(400).json(error);
		}
	},

	create: async (req, res) => {
		const product = new Product({
			name: req.body.name,
			quantity: req.body.quantity,
			currency: req.body.currency,
			price: req.body.price
		});

		try {
			let response = await product.save(product);
			res.json(response);
		} catch (error) {
			res.status(400).json(error);
		}
    }
}