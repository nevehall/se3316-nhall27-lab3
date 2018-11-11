const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProductSchema = new Schema({
    name: {type: String, required: true, max: 100},
    quantity: {type: Number, required: true},
    price: {type: Number, required: true},
    tax: {type: Number, required: true}
});

// export the model
module.exports = mongoose.model('Product', ProductSchema);

