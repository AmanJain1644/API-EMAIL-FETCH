const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

router.patch('/:id',productsController.updateProduct);
router.post('/insert',productsController.insertProduct);

module.exports = router;
