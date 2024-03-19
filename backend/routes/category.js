const express = require("express");
// create users router
const categoryRouter = express.Router();
const { createCategory } = require("../controllers/category");
const authentication=require("../middleware/authentication")
const authorization=require("../middleware/authorization")
categoryRouter.use(authentication)
// endpoint for the POST request(createCategory)
categoryRouter.post("/",authentication,authorization("create category"),createCategory)


//export it
module.exports = categoryRouter;