const express = require("express");

// create roles router
const rolesRouter = express.Router();
// import functions from controller and middlewares

const {createRole } = require("../controllers/roles");



// endpoint for the POST request(createRole)
rolesRouter.post("/", createRole);





module.exports = rolesRouter;