const Users = require("../models/Users");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

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
    try {
      const user = new Users({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
      });

      user.save((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "Registiration successful!" });
        });
      });
    } catch (error) {
      throw error;
    }
  },
};
module.exports = controller;
