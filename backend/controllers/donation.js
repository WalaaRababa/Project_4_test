const donationModel=require("../models/donationSchema")
const userMosel=require("../models/userSchema")


const getAllDonationByUserId =(req ,res)=>{
    const {objectId}=req.params
    console.log('first', objectId)
   
    
    donationModel.find({ donor: objectId })
    .populate("donor")
    
    .then((result)=>{
        console.log('result', result)
        if(!result.length){
            
            return res.status(404).json({
                success: false,
                message: `The donations made by  => ${objectId} not found`,
                });
        }else{
            console.log('result', result)
            res.status(200).json({
                success: true,
                message: `All The donations made by  => ${objectId} `,
                donation: result,
                token: req.token
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
    getAllDonationByUserId
}; 