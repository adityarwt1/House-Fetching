const express = require("express");
const router = express.Router();
const House = require("../models/House");

// 📌 GET: Show all houses on home page
router.get("/", async (req, res) => {
    try {
        const houses = await House.find();
        res.render("index", { houses });
    } catch (error) {
        res.status(500).send("Error fetching houses");
    }
});

// 📌 GET: Show add house form
router.get("/add-house", (req, res) => {
    res.render("add-house"); // Renders the form
});

// 📌 POST: Add new house
router.post("/add-house", async (req, res) => {
    try {
        const { name, owner, location, description, price, image } = req.body;

        // Create new house
        const newHouse = new House({ name, owner, location, description, price, image });

        // Save to MongoDB
        await newHouse.save();

        res.redirect("/"); // Redirect to home page
    } catch (error) {
        res.status(500).send("Error adding house");
    }
});

module.exports = router;
