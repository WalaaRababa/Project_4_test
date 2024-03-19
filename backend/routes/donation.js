const express = require("express");
// create users router
const donationRouter = express.Router();
const { getAllDonationByUserId } = require("../controllers/donation");
const authentication=require("../middleware/authentication")
const authorization=require("../middleware/authorization")


// endpoint for the get all donations by id
donationRouter.get("/:objectId/user" ,authentication,getAllDonationByUserId);

//export it
module.exports = donationRouter;