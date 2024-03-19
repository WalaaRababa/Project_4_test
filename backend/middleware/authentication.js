const jwt = require('jsonwebtoken')
const authentication =async (req,res,next)=>{
    //console.log(req.authorization)
    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ").pop()
        console.log('token : ', token);

    try{
        const verifiedToken = await jwt.verify(token, process.env.SECRET);
        console.log('parsedToken : ', verifiedToken);
        req.token = verifiedToken
        
        next()
    }
    catch(err){
            res.status(403).json({
                success: false,
                message: "The token is invalid or expired"
            })
    }
    }else{
        res.status(403).json({
            success: false,
            message: "Forbidden"
        }) 
    }
    
}

module.exports = authentication