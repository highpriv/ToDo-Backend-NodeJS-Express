const Users = require("../models/Users");
const Tasks = require("../models/Tasks");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const config = require("../config/authentication");

const controller = {

  async createTask(req, res, next) {
    try {
      const task = new Tasks({
        userID: req.body.userID,
        content: req.body.content,
        status: req.body.status
        
      });

      task.save((err, user) => {
        if (err) {
          res.status(500).send({ message: err, status: 500 });
          return;
        }

        task.save((err) => {
          if (err) {
            res.status(500).send({ message: err, status: 500 });
            return;
          }

          res.send({ message: "Registiration successful!", status: 200 });
        });
      });
    } catch (error) {
      throw error;
    }
  },

};
module.exports = controller;
