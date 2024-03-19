


const initiativeModel=require("../models/InitiativeSchema")
const reviewModel=require("../models/reviewSchema")
const donationModel=require("../models/donationSchema")




/* const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); */



// 1. this function to create an Initiative

const createNewInitiative = (req, res) => {
    const {  name,
        img,
        description,
    duration,
    city,
    currentAmount,
    volunteerLimit, plan :{
        //representing each day with times
        schedule,
        listOfDuties,
        targetAmount,
        startDate,
        endDate,
        targetAudience},
    volunteerRequirements :{
        
        ageGroup,
        requirementSkills
    },
    
    reviewsSent,
    category,donation}= req.body
    

    const newInitiative = new initiativeModel( {  name,
        description,
        img,
    duration,
    city,
    currentAmount,
    volunteerLimit, plan :{
        //representing each day with times
        schedule,
        listOfDuties,
        targetAmount,
        startDate,
        endDate,
        targetAudience},
    volunteerRequirements :{
        
        ageGroup,
        requirementSkills
    },
    
    reviewsSent,
    category,donation,author:req.token.userId})
    
    newInitiative.save().then((result)=>{
        res.status(201).json({
        success: true,
        message: "initiative created",
        initiative : result,
        })
    }).catch((err)=>{
        console.log(err);
        res.status(409).json({
            success: false,
            message: "Server Error",
            err: err
        })
    })
    };

// 2. this function to gel all Initiative

const getAllInitiative=(req,res)=>{
    initiativeModel.find({})
    //re active them when you finish create all schemas
    .populate("reviewsSent")
    .populate("category")
    .populate("donation")
    
    
    .then((result)=>{
        res.status(200).json({
        success: true,
        message: "All the Initiative",
        initiative : result,
        })
        }).catch((err)=>{
            console.log(err);
            res.status(500).json({
                success: false,
                message: "Server Error",
                err: err
            })
        })

}


 // 1. this function to create NEW Review

const createNewReview =async (req, res) => {

    try{ const {initiativeId}=req.params
    const { review}= req.body

    const newReview =  new reviewModel({ 
    review,
    reviewer:req.token.userId
})

    await newReview.save()
    
    //find and update
const result =await initiativeModel.findByIdAndUpdate(initiativeId,{$push:{reviewsSent:newReview}},{
    new: true
    })
    
//result.comments.push(newComment)
//await result.save()
console.log(result);
res.status(201).json({
    success: true,
    message: "Comment created",
    review: newReview,
    token:req.token,
    reviewer:{firstName:req.token.author,
    lastName:req.token.last
    }


    })
}
    catch(err){
    console.log(err);
    res.status(201).json({
        success: false,
        message: "Server Error",
        err: err
    })
    }
}; 

// 1. this function to create NEW Donation

const createNewDonation =async (req, res) => {

    try{ const {initiativeId}=req.params
    const { amount}= req.body

    const newDonation =  new donationModel({ 
        amount,
        donor:req.token.userId
})
    
await newDonation.save()
    //find and update
const result =await initiativeModel.findByIdAndUpdate(initiativeId,{$push:{donation:newDonation}},{
    new: true
    })
//result.comments.push(newComment)
//await result.save()
console.log(result);
res.status(201).json({
    success: true,
    message: " Donation created",
    review: newDonation,

    })
}
    catch(err){
    console.log(err);
    res.status(201).json({
        success: false,
        message: "Server Error",
        err: err
    })
    }
}; 
const getAllReviews =(req ,res)=>{
    const {objectId}=req.params
    console.log('first', objectId)
    reviewModel.find( {reviewer:objectId} )
    
    .populate("reviewer")
    
    .then((result)=>{
        console.log('result', result)
        if(!result){
            
            return res.status(404).json({
                success: false,
                message: `The Initiative with category => ${objectId} not found`,
                });
        }else{
            console.log('result', result)
            res.status(200).json({
                success: true,
                message: `The category ${objectId} `,
                category: result,
                });
        }

    }).catch((err)=>{
        console.log('err', err)
        res.status(500).json({
            success: false,
            message: `Server Error`,
            err: err.message,
            });
    })
}
const getAllInitiativeByCategory =(req ,res)=>{
    const {objectId}=req.params
    console.log('first', objectId)
    initiativeModel.find({ category: objectId })
    .populate("category")
    .populate("reviewsSent")
    .populate("donation")
    .then((result)=>{
        console.log('result', result)
        if(!result){
            
            return res.status(404).json({
                success: false,
                message: `The Initiative with category => ${objectId} not found`,
                });
        }else{
            console.log('result', result)
            res.status(200).json({
                success: true,
                message: `The category ${objectId} `,
                category: result,
                });
        }

    }).catch((err)=>{
        console.log('err', err)
        res.status(500).json({
            success: false,
            message: `Server Error`,
            err: err.message,
            });
    })
}



// This function deletes a specific Review by its id
const deleteReviewById = (req, res) => {
    const {id}= req.params;
    reviewModel
        .findByIdAndDelete(id)
        .then((result) => {
        if (!result) {
        return res.status(404).json({
            success: false,
            message: `The review with id => ${id} not found`,
        });
        }
        res.status(200).json({
            success: true,
            message: `review deleted`,
        });
        })
        .catch((err) => {
        res.status(500).json({
            success: false,
            message: `Server Error`,
            err: err.message,
        });
        });
    };

    
// This function deletes a specific Review by its id
const deleteInitiativeById = (req, res) => {
    const {id}= req.params;
    initiativeModel
        .findByIdAndDelete(id)
        .populate("reviewsSent")
        .populate("category")
        .populate("donation")
        
        .then((result) => {
        if (!result) {
        return res.status(404).json({
            success: false,
            message: `The Initiative with id => ${id} not found`,
        });
        }
        res.status(200).json({
            success: true,
            message: `Initiative deleted`,
        });
        })
        .catch((err) => {
        res.status(500).json({
            success: false,
            message: `Server Error`,
            err: err.message,
        });
        });
    };



    // This function updates Initiative by its id
const updateInitiativeById = (req, res) => {
    const {id} = req.params;
    const filter = req.body;
    Object.keys(filter).forEach((key) => {
        filter[key].toString().replaceAll(" ", "") == "" && delete filter[key];
    });
    initiativeModel
        .findByIdAndUpdate({ _id: id }, req.body, { new: true })
        .then((newInitiative) => {
        if (!newInitiative) {
            return res.status(404).json({
            success: false,
            message: `The Initiative with id => ${id} not found`,
            });
        }
        res.status(202).json({
            success: true,
            message: `Initiative updated`,
            initiative: newInitiative,
        });
        })
        .catch((err) => {
        res.status(500).json({
            success: false,
            message: `Server Error`,
            err: err.message,
        });
    });
    };


    

    // This function updates review by its id
const updateReviewsById = (req, res) => {
    const {id} = req.params;
    const filter = req.body;
    Object.keys(filter).forEach((key) => {
        filter[key].toString().replaceAll(" ", "") == "" && delete filter[key];
    });
    reviewModel
        .findByIdAndUpdate({ _id: id }, req.body, { new: true })
        .populate("reviewer")
        .then((newReview) => {
        if (!newReview) {
            return res.status(404).json({
            success: false,
            message: `The Review with id => ${id} not found`,
            });
        }
        res.status(202).json({
            success: true,
            message: `Review updated`,
            review: newReview,
        });
        })
        .catch((err) => {
        res.status(500).json({
            success: false,
            message: `Server Error`,
            err: err.message,
        });
    });
    };


    const getAllInitiativeById =(req ,res)=>{
        const {objectId}=req.params
        console.log('first', objectId)
        initiativeModel.findById( objectId )
        .populate("category")
        .populate({ path: "reviewsSent", populate: { path: "reviewer", select: "firstName lastName", },})

        
        
        .populate("donation")
        .then((result)=>{
            console.log('result', result)
            if(!result){
                
                return res.status(404).json({
                    success: false,
                    message: `The Initiative with category => ${objectId} not found`,
                    
                    });
            }else{
                console.log('result', result)
                res.status(200).json({
                    success: true,
                    message: `The category ${objectId} `,
                    initiative: result,
                    });
            }
    
        }).catch((err)=>{
            console.log('err', err)
            res.status(500).json({
                success: false,
                message: `Server Error`,
                err: err.message,
                });
        })
    }
    
    


module.exports = { 
    createNewInitiative,
    getAllInitiative,
    createNewReview,
    createNewDonation,
    getAllInitiativeByCategory,
    deleteReviewById,
    deleteInitiativeById,
    updateInitiativeById,
    updateReviewsById,getAllInitiativeById,
    getAllReviews
}; 