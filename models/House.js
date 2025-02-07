const mongoose = require("mongoose");

const HouseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    owner: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true } // Store image path like "/house.jpg"
});

module.exports = mongoose.model("House", HouseSchema);
