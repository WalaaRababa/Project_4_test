const jwt = require('jsonwebtoken')
const authorization=(string )=>{
    
return (req,res,next)=>{
    console.log('first', req.token.role.permissions)
    if(req.token.role.permissions.includes(string)){
    console.log(true)
        next()
    }else{
        res.status(403).json({
            success: false,
            massage: "Unauthorized"
        })
    }



}
}


module.exports = authorization