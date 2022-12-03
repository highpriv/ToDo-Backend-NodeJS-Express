const UserController = require("../controllers/UserController");
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

module.exports = router;
