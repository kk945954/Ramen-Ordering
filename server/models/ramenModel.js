const mongoose = require("mongoose");

const ramenSchema = new mongoose.Schema({
    name: String, 
    size: [],
    price: [],
    image: String,
    ingredients: String,
    description: String
});

const Ramen = mongoose.model("ramens", ramenSchema);

module.exports = Ramen;

