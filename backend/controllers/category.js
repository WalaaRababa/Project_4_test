const categoryModel=require("../models/categorySchema")
/* const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); */


// 1. this function create new role
const createCategory = (req, res) => {
    const {  categoryName  }= req.body

    const newCategory = new categoryModel({ 
        categoryName
})
    
newCategory.save().then((result)=>{
        res.status(201).json({
        success: true,
        message: "Success role created",
        Category: result,
        })
    }).catch((err)=>{
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Server error",
        })
    })
};










module.exports = { 
    createCategory
}; 