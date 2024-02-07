const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");

const app = express();

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ msg: "API Running at port 5000" });
});

require("./config/route.config")(app);

const PORT = process.env.PORT || 5000;

// error handler
app.use(errorHandler);

// connect db and start server

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Database connected and sever running at ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
