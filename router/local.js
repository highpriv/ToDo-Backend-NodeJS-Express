const UserController = require("../controllers/UserController");
const TaskController = require("../controllers/TaskController");
const { verifySignUp } = require("../middlewares");

// router local.js - Router Public Module

const express = require("express");
const router = express.Router();

// User authentication CRUD.
router.get("/users", UserController.getUsers);
router.post(
  "/users",
  [verifySignUp.checkDuplicateUsernameOrEmail],
  UserController.createUser
);
router.post("/login", UserController.signIn);
router.post("/create-tasks", TaskController.createTask);

module.exports = router;
