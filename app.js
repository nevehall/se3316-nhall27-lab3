// Neve Hall
// app.js

const express = require('express');
const bodyParser = require('body-parser');

// imports routes for the products
const product = require('./routes/product.route');
const app = express();

// Set up mongoose connection
const mongoose = require('mongoose');
let dev_db_url = 'mongodb://nhall27:Database3316@ds217360.mlab.com:17360/se3316-nhall27-lab3';
let mongoDB = process.env.MONGODB_URI || dev_db_url;   
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/products', product);
app.use('/home/', express.static('display'));

let port = process.env.PORT;

app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});