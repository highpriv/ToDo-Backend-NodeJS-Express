const UserController = require("../controllers/UserController");
const { verifySignUp, jwtAuth } = require("../middlewares");
var jwt = require("jsonwebtoken");
const config = require("../config/authentication");
const Users = require("../models/Users");

// router local.js - Router Public Module

const express = require("express");
const router = express.Router();

// User authentication CRUD.
router.post(
  "/users",
  [verifySignUp.checkDuplicateUsernameOrEmail],
  UserController.createUser
);
router.post("/login", UserController.signIn);
router.post("/check-token", jwtAuth.checkToken);
router.get("/user", UserController.getUser);
router.post("/logout", (req, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.send({
    message: "Logged Out",
  });
});

module.exports = router;
