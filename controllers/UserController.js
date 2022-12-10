const Users = require("../models/Users");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const config = require("../config/authentication");

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

  async signIn(req, res) {
    const { username } = req.body;

    Users.findOne({
      $or: [{ email: username }, { username: username }],
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ status: 500, message: err });
        return;
      }

      if (!user) {
        return res
          .status(404)
          .send({ status: 404, message: "User Not found." });
      }

      var checkPassword = bcrypt.compareSync(req.body.password, user.password);

      if (!checkPassword) {
        return res.status(401).send({
          status: 401,
          accessToken: null,
          message: "Wrong password",
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400,
      });

      res.status(200).send({
        status: 200,
        id: user._id,
        username: user.username,
        email: user.email,
        accessToken: token,
      });
    });
  },
};
module.exports = controller;
