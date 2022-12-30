const { ObjectID } = require("mongodb");
const mongoose = require("mongoose");

AutoID = mongoose.Types.ObjectId;

const usersSchema = new mongoose.Schema({
  id: AutoID,
  userID: {
    type: ObjectID,
    default: null,
  },
  title: String,
  description: String,
  created: Date,
  status: {
    type: String,
    enum: ["todo", "ongoing", "completed"],
  },
});

module.exports = mongoose.model("Tasks", usersSchema, "tasks");
