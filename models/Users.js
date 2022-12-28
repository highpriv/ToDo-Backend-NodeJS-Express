const { ObjectID } = require("mongodb");
const mongoose = require("mongoose");

AutoID = mongoose.Types.ObjectId;

const usersSchema = new mongoose.Schema({
  id: AutoID,
  username: String,
  email: String,
  name: String,
  password: String,
  name: String,
  surname: String,
  profile_photo: String,
});

module.exports = mongoose.model("Users", usersSchema, "users");
