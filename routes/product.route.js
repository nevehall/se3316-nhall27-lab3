//routes/products/route.js

const express = require('express');
const router = express.Router();

// Require the controllers - but we have not created them yet!!
const product_controller = require('../controllers/product.controller');

// a simple test url to check that all of our files are communicating correctly
//router.get('/test', product_controller.test);
router.post('/create', product_controller.product_create);
router.get('/getOne/:id', product_controller.product_details);
router.put('/update/:id', product_controller.product_update);
router.delete('/delete/:id', product_controller.product_delete);
router.get('/findAll',product_controller.product_findall);

module.exports = router;