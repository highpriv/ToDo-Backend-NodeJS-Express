const Users = require("../models/Users");
const UserController = require("../controllers/UserController");

// router local.js - Router Public Module

const express = require("express");
const router = express.Router();


// User authentication CRUD.
router.get("/users", UserController.getUsers);
router.post("/users", UserController.createUser);


module.exports = router;