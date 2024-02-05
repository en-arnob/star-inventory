const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

// connect db and start server

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Database connected and sever running at ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
