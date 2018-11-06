// Neve Hall
// app.js

const express = require('express');
const bodyParser = require('body-parser');

// imports routes for the products
const product = require('./routes/product.route');
const app = express();

app.use('/products', product);

let port = process.env.PORT;

app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});