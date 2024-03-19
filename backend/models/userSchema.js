const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// user schema 
const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number },
    country: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role:{type:mongoose.Schema.Types.ObjectId,ref:"Role"}
});

/* On the userSchema add a mongoose pre middleware on save event that will:
convert the case of the email to lowercase */

userSchema.pre("save",async function(){
    try{this.email=this.email.toLowerCase()
    this.password =await bcrypt.hash(this.password,5)
} catch(err){
    throw(err)
}
})




//export it 
module.exports=mongoose.model("User",userSchema)
