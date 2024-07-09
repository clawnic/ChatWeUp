const jwt  = require('jsonwebtoken');
const User = require('../models/user.model')

const protectRoute = async(req,res,next)=>{
    
    try {
        
        const token = req.cookies.jwt;
        
        if(!token){
            return res.status(404).json({error:"Unauthorized - no token provided" });
        }
        
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        
        if(!decode){
            return res.status(401).json({error:"Unauthorized - invalid token" });
        }
        
        
        const user = await User.findOne({_id:decode.userId}).select("-password");
        
        if(!user){
            return res.status(404).json({error:"Unauthorized - user not found" });
        }
        
        req.user = user;
        
        next();
        
    } catch (error) {
        console.log("error in protectRoute utils : ", error.message);
        res.status(500).json({
            error:"internal server error"
        })
    }
}

module.exports = protectRoute;