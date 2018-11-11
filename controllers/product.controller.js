//controllers/products.js

//SANITIZATION -- server side
function encodeHTML(e){
    return e.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}


exports.product_details = function (req, res) {
    Product.findById(req.params.id, function (err, product) {
        if (err) return next(err);
        res.send(product);
    })
};

exports.product_create = function (req, res) {
    let product = new Product(
        {
            name: encodeHTML(req.body.name),
            quantity: req.body.quantity,
            price: req.body.price,
            tax: req.body.tax
        }
    );

    product.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Product Created successfully')
    })
};

exports.product_update = function (req, res) {
    //console.log('request received');
    Product.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, product) {
        if (err) return next(err);
        res.send('Product udpated.');
        //console.log('product updated');
    });
};

exports.product_delete = function (req, res) {
    Product.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};

exports.product_findall = function(req, res, next){
    //console.log("in find all")
    Product.find(function(err, fruits) {
            if (err)
                console.log(err);

            res.send(fruits);
        });
}

const Product = require('../models/product.model');

// simple version, without validation or sanitation
exports.test = function (req, res){
    res.send('Greetings from the Test controller!');
};