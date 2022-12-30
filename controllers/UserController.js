const Users = require("../models/Users");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const config = require("../config/authentication");

const controller = {
  async getUser(req, res, next) {
    try {
      const cookie = req.cookies["jwt"];

      const checkCookie = jwt.verify(cookie, config.secret);

      if (!checkCookie) {
        return res.status(401).send({
          message: "auth error when verify",
        });
      }

      const user = await Users.findOne({ _id: checkCookie._id });

      const { password, ...data } = await user.toJSON();

      res.send(data);
    } catch (err) {
      res.status(401).send({
        message: "An error occured!",
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

      const haveUser = await Users.findOne({
        $or: [{ email: req.body.email }, { username: req.body.username }],
      });

      if (haveUser)
        res
          .status(404)
          .send({ message: "Email or username taken", status: 500 });

      user.save((err) => {
        if (err) {
          res.status(500).send({ message: err, status: 500 });
          return;
        }

        res.send({ message: "Registiration successful!", status: 200 });
      });
    } catch (error) {
      throw error;
    }
  },

  async signIn(req, res) {
    const { username } = req.body;

    const user = await Users.findOne({
      $or: [{ email: username }, { username: username }],
    });

    if (!user) {
      return res.status(404).send({ status: 404, message: "User Not found." });
    }

    var checkPassword = bcrypt.compareSync(req.body.password, user.password);

    if (!checkPassword) {
      return res.json({
        status: 404,
        accessToken: null,
        message: "Wrong password",
      });
    }

    var token = jwt.sign({ _id: user._id }, config.secret, {
      expiresIn: 86400,
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200).send({
      status: 200,
      message: "Login Successful",
    });
  },

  async updateProfile(req, res) {
    const { name, surname, username, email, current_pw, password } = req.body;

    const cookie = req.cookies["jwt"];

    const checkCookie = jwt.verify(cookie, config.secret);

    if (!checkCookie) {
      return res.status(401).send({
        message: "auth error when verify",
      });
    }

    const user = await Users.findOne({ _id: checkCookie._id });

    const userWithMail = await Users.findOne({ email: email });
    const userWithUserName = await Users.findOne({ username: username });

    if (!user) {
      return res.status(404).send({ status: 404, message: "User Not found." });
    }

    if (user.username !== username && userWithUserName)
      return res
        .status(401)
        .send({ status: 401, message: "Username already taken." });

    if (user.email !== email && userWithMail)
      return res
        .status(401)
        .send({ status: 401, message: "Email already in use." });

    user.name = name;
    user.surname = surname;
    user.email = email;
    user.username = username;

    if (current_pw) {
      const checkPw = bcrypt.compareSync(current_pw, user.password);
      if (checkPw) user.password = bcrypt.hashSync(password, 8);
      else
        return res
          .status(401)
          .send({ status: 401, message: "Current password is wrong." });
    }

    user.save();

    res.send({
      message: "Update Successful",
    });
  },
};
module.exports = controller;
