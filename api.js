const express = require('express');
const router = express.Router();
const categoriesRouter = require('./routes/CategoriesRoute');
const companiesRouter = require('./routes/CompaniesRoute');
const filterRouter = require('./routes/FilterProductsRoute');
const productsRouter = require('./routes/ProductsRoute');

router.use('/categories', categoriesRouter);
router.use('/companies', companiesRouter);
router.use('/filterProducts', filterRouter);
router.use('/products',productsRouter)

module.exports = router;
