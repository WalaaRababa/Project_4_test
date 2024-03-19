const mongoose = require("mongoose");

// donationSchema  
const donationSchema = new mongoose.Schema({
    amount: { type:Number, required: true },
    donor: {type:mongoose.Schema.Types.ObjectId,ref:"User"}
});


//export it 
module.exports=mongoose.model("Donation",donationSchema)
