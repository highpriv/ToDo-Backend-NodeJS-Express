const { ObjectID } = require("mongodb");
const mongoose = require("mongoose");

AutoID = mongoose.Types.ObjectId;

const tasksSchema = new mongoose.Schema({
  id: AutoID,
  userID: {
    type: ObjectID,
    required: true,
    default: null,
    ref: "Users",
  },
  content: {
    type: String
  },
  status: {
    type: String,
    require: true,
    enum: [
      "todo",
      "ongoing",
    "done"
    ],
    default: "todo",
  },
  created: Date,
});

module.exports = mongoose.model("Tasks", tasksSchema, "tasks");
