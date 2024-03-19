const userModel=require("../models/userSchema")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// 1. this function create new user
const register=(req,res)=>{
    const { firstName,lastName,age,country,email,password ,role}= req.body
    const newUser= new userModel({firstName,lastName,age,country,email,password ,role})


    newUser.save().then((result)=>{
        res.status(201).json({
        success: true,
        message: "Account Created Successfully",
        author: result,
        })
    }).catch((err)=>{
        console.log(err);
        res.status(409).json({
            success: false,
            message: "The email already exists",
        })
    })
}


// 2. this function for login 

const login =(req,res)=>{
    const { email,password }= req.body
    userModel.findOne({email})
    .populate("role")
    .then(async (result)=>{
console.log('result here', result)
        if(!result){
            
        
            res.status(401).json({
                success: false,
                message: "Invalid login credentials",
            })
        } else {
            //here we need to check the password with the hashing one
            const validPass= await bcrypt.compare(password,result.password)
            if(!validPass){
                res.status( 403).json({
                    success: false,
                    message: " The email doesn’t exist or the password you’ve entered is incorrect",
                    result:result
                    }
                    
                    )
            }else{
                const options = {
                    expiresIn: "120m"
                }
                const payload = {
                    userId:result.id,
                    author:result.firstName,
                    last:result.lastName,
                    country:result.country,
                    role: result.role,
                    nameRole:result.role.role,
                    age:result.age

                }
                console.log('payload', payload.role.permissions)
                const userToken =jwt.sign(payload,process.env.SECRET,options)
                console.log('userToken', userToken)
                res.status(200).json({
                    success: true,
                    message: "Valid login credentials",
                    token: userToken,
                    role:result.role,
                    author:result.firstName,
                    userId:result.id,
                    
                    })
            }
        }
    
    })
    .catch(err=>{
        console.log('err', err)
        res.status( 403).json({
            success: false,
            message: "The email doesn’t exist or the password you’ve entered is incorrect",
            })
    })
}















module.exports = { 
    register,
    login,
}; 