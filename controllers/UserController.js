const Users = require("../models/Users");

const controller = {
  async getUsers(req, res, next) {
    let result = await Users.find({});

    if (result && result.length > 0) {
      return res.json({
        result: "success",
        message: "User list recieved.",
        users: result,
      });
    } else {
      return res.json({
        result: "error",
        message: "Couldnt find users!",
        errCode: "USERS_NOT_FOUND",
      });
    }
  },

  async createUser(req, res, next) {
    // I'm working on it
    console.log(req.body);
  },
};
module.exports = controller;
