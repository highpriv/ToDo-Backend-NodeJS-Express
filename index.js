const mongoose = require("mongoose");
const express = require('express')
const public = require("./router/local");

require("dotenv").config(); 

mongoose.connect(
    process.env.MONGODB_URI, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);



const app = express();
app.listen(3000, () => console.log("Server is running"));

app.use("/", public);