var express = require('express');
var router = express.Router();
const { Product } = require('../controllers');

router.get('/products', Product.getAll);
router.get('/calculate', Product.calculate);

router.post('/add', Product.create);

module.exports = router;
