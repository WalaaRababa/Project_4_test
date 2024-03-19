const express = require("express");
// create users router
const usersRouter = express.Router();

// import functions from controller and middlewares

const { register ,login } = require("../controllers/user");



// endpoint for the POST request(register)
usersRouter.post("/register", register);

// endpoint for the POST request(register)
usersRouter.post("/login", login);
//export it
module.exports = usersRouter;