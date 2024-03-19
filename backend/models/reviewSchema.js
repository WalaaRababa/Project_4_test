const mongoose = require("mongoose");

// role schema 
const reviewSchema = new mongoose.Schema({
    review: { type: String, required: true },
    reviewer: {type:mongoose.Schema.Types.ObjectId,ref:"User"},

});


//export it 
module.exports=mongoose.model("review",reviewSchema)
