const { ObjectID } = require("mongodb");
const mongoose = require("mongoose");

AutoID = mongoose.Types.ObjectId;

const usersSchema = new mongoose.Schema({
    id: AutoID,
    name: String,
    password: String,
});

module.exports = mongoose.model("Users", usersSchema, "users");
