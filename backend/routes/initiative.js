const express = require("express");
// create initiative router
const initiativeRouter= express.Router();
const authentication=require("../middleware/authentication")
const authorization=require("../middleware/authorization")





// import functions from controller and middlewares

const { createNewInitiative , getAllInitiative,createNewReview,createNewDonation,getAllInitiativeByCategory,deleteReviewById,deleteInitiativeById,updateInitiativeById,updateReviewsById,getAllInitiativeById,getAllReviews} = require("../controllers/initiative");



// endpoint for the POST request (createNewInitiative)
initiativeRouter.post("/",authentication,authorization("create initiative"),createNewInitiative);


// endpoint for the GET request (getAllInitiative)
initiativeRouter.get("/",getAllInitiative);


// endpoint for the create a new Review
initiativeRouter.post("/:initiativeId/review",authentication,authorization("create review") ,createNewReview);
// endpoint for the create a new donation
initiativeRouter.post("/:initiativeId/donation",authentication,authorization("create donation") ,createNewDonation);
// endpoint for the get All InitiativeByCategory
initiativeRouter.get("/:objectId/category" ,getAllInitiativeByCategory);
deleteInitiativeById
// endpoint for the delete a  review
initiativeRouter.delete("/:id/review" ,deleteReviewById);

// endpoint for the delete an Initiative By its Id
initiativeRouter.delete("/:id" ,deleteInitiativeById);


// endpoint for the update an Initiative By its Id
initiativeRouter.put("/:id" ,updateInitiativeById);

// endpoint for the update an Review By its Id
initiativeRouter.put("/:id/review" ,updateReviewsById);


// endpoint for the get an in By its Id
initiativeRouter.get("/:objectId" ,getAllInitiativeById);

// endpoint for the get an in By its Id
initiativeRouter.get("/:objectId/review" ,getAllReviews);


module.exports = initiativeRouter;