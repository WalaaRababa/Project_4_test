const mongoose = require("mongoose");

// Initiative  schema 
const initiativeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    img:{type: String, required: true},
    duration: { type: String },
    city: { type: String, required: true },
    currentAmount: { type: Number, required: true},
    volunteerLimit: { type: Number, required: true },
    
    
    plan :{
        //representing each day with times
        schedule: [{type:String , required:true}],
        listOfDuties: [{type:String ,required:true}],
        targetAmount: {type:Number , required:true},
        startDate: {type:String , required:true},
        endDate: {type:String , required:true},
        targetAudience: {type:String , required:true},


    },
    volunteerRequirements :{
        //representing each day with times
        ageGroup: {type:String , required:true},
        requirementSkills: [{type:String , required:true}],

    },
    //here
    reviewsSent :[{type:mongoose.Schema.Types.ObjectId,ref:"review"}],
    category:{type:mongoose.Schema.Types.ObjectId,ref:"Category"},
    donation:[{type:mongoose.Schema.Types.ObjectId,ref:"Donation"}],
    
});


//export it 
module.exports=mongoose.model("Initiative",initiativeSchema)
