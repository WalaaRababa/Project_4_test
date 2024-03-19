const mongoose = require("mongoose");

// categorySchema  
const categorySchema = new mongoose.Schema({
    categoryName: { type: String, required: true },


});


//export it 
module.exports=mongoose.model("Category",categorySchema)
