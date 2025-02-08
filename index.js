const express = require("express");
const app = express();
const urlRoute = require("./routes/url");
require("dotenv").config();
const { connectToMongoDb } = require("./lib/connect");
const URL = require("./models/url");

const PORT = process.env.PORT || 3000;

connectToMongoDb(process.env.MONGODB_URI).then(() => {
    console.log("Connected to MongoDB");
});
app.set("view engine" , "ejs")
app.set("views" , "views")
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/url", urlRoute);

app.get("/:shortid", async (req, res) => {
    try {
        const { shortid } = req.params;

        const entry = await URL.findOneAndUpdate(
            { shortid },
            {
                $push: {
                    visitHistory: {
                        timestamp: Date.now()
                    }
                }
            },
            { new: true }
        );

        if (!entry) {
            return res.status(404).json({ error: "Short URL not found" });
        }

        res.redirect(entry.redirectURL);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
