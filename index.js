const mongoose = require("mongoose");
const express = require("express");
const public = require("./router/local");
var cookieParser = require("cookie-parser");

require("dotenv").config();
const cors = require("cors");

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var corsOptions = {
  origin: "http://localhost:4500",
  credentials: true,
};

const app = express();
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(3000, () => console.log("Server is running"));

app.use("/", public);
