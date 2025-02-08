const { nanoid } = require("nanoid"); // third-party module for shortening
const URL = require("../models/url"); // using MongoDB for storing the data

async function handleGenerateNewShortURL(req, res) {
    // Get the URL from the request body
    const { url } = req.body;

    // Check if the URL is provided
    if (!url) {
        return res.status(400).json({ error: "URL is required" });
    }

    const shortid = nanoid(8);

    await URL.create({
        shortid: shortid,
        redirectURL: url,
        visitHistory: []
    });

    return res.json({ id: shortid });
}

module.exports = {
    handleGenerateNewShortURL
};
