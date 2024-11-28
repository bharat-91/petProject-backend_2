const connection = require("./src/database/connection");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./src/routes/user.routes");
dotenv.config();
connection();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use("/api", userRoutes);
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
