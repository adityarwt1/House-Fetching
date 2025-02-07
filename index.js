const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// Connect to MongoDB
mongoose.connect("mongodb+srv://adita_rwt1:14920251@mongoongoing.ysjj1.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

// Routes
const houseRoutes = require("./routes/index");
app.use("/", houseRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
