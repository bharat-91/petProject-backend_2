const mongoose = require("mongoose");
require("dotenv").config();

const connection = () => {
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDB connected!");
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
    });
};

module.exports = connection;
