const Users = require("../models/Users");
const Tasks = require("../models/Tasks");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const config = require("../config/authentication");

const controller = {
  async getTasks(req, res, next) {
    try {
      const cookie = req.cookies["jwt"];

      let perPage = 9;
      let page = Math.max(0, req.params.page);

      const checkCookie = jwt.verify(cookie, config.secret);

      if (!checkCookie) {
        return res.status(401).send({
          message: "auth error when verify",
        });
      }

      const user = await Users.findOne({ _id: checkCookie._id });

      const tasks = await Tasks.find(
        {
          userID: user._id,
          status: req.params.status,
        },
        {},
        {
          skip: req.query.page !== "0" ? perPage * (page - 1) : 0,
          limit: req.query.page !== "0" ? perPage : 10000,
        }
      ).sort({ _id: -1 });

      res.send(tasks);
    } catch (err) {
      res.status(401).send({
        message: "An error occured!",
      });
    }
  },

  async createTasks(req, res, next) {
    try {
      const cookie = req.cookies["jwt"];

      const checkCookie = jwt.verify(cookie, config.secret);

      if (!checkCookie) {
        return res.status(401).send({
          message: "auth error when verify",
        });
      }

      const user = await Users.findOne({ _id: checkCookie._id });
      const userID = user._id;

      let { title, description } = req.body;
      if (!title || !description)
        return res
          .status(404)
          .send({ message: "You can not leave blank any fields" });
      const created = new Date();
      const newTask = new Tasks({
        title,
        description,
        userID,
        status: "todo",
        created,
      });

      newTask.save((err) => {
        if (err) {
          res.status(500).send({ message: err, status: 500 });
          return;
        }

        res.send({ message: "Created successful!", status: 200 });
      });
    } catch (error) {
      throw error;
    }
  },

  async editTask(req, res, next) {
    try {
      const cookie = req.cookies["jwt"];

      const checkCookie = jwt.verify(cookie, config.secret);

      if (!checkCookie) {
        return res.status(401).send({
          message: "auth error when verify",
        });
      }

      const user = await Users.findOne({ _id: checkCookie._id });

      let task = await Tasks.findOne({
        _id: req.params.id,
        userID: user._id,
      });

      if (!task) {
        return res.status(401).send({
          message: "Task couldn't find!",
        });
      }

      let { title, description, status } = req.body;

      const filter = { _id: req.params.id };
      const update = { title, description, status };

      await Tasks.findOneAndUpdate(filter, update, {
        returnOriginal: false,
      });

      return res.status(200).send({
        message: "OK!",
      });
      next();
    } catch (err) {
      return res.status(401).send({
        message: "An error occured!",
      });
    }
  },
};
module.exports = controller;
