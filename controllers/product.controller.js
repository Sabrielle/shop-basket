const Product = require('../models/Product');
const fetch = require("node-fetch");

function calculateByCurrency (products, rates, currency) {
    let sum = 0;
    products.forEach(product => {
        sum += product.quantity * convert(rates, product.price, product.currency, currency);    
    });
    return sum.toFixed(2);
}

function convert (rates, price, from, to) {
    return to === from ? price : price * rates[to][from];
}

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
    },

    calculate: async (req, res) => {
		try {
            let rates;
            let products = await Product.find();
            let response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js')
            let json = await response.json();
            if (json.Valute && json.Valute.USD && json.Valute.EUR) {
                rates = json.Valute;
            }
            else {
                throw new Error('The list of exchange rates is empty');
            }
            const USD = Number(rates.USD.Value);
            const EUR = Number(rates.EUR.Value);
            const exchange = {
                'RUB': {
                    'USD': USD,
                    'EUR': EUR
                },
                'USD': {
                    'RUB': 1/USD,
                    'EUR': EUR/USD
                },
                'EUR': {
                    'RUB': 1/EUR,
                    'USD': USD/EUR
                }
            }
            let sumRUB = calculateByCurrency(products, exchange, 'RUB');
            let sumUSD = calculateByCurrency(products, exchange, 'USD');
            let sumEUR = calculateByCurrency(products, exchange, 'EUR');
			res.json({
                'RUB': sumRUB,
                'USD': sumUSD,
                'EUR': sumEUR
            });
		} catch (error) {
            console.log(error);
			res.status(400).json(error);
		}
	}
}