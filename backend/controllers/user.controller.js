const User = require('../models/user.model');

const getUser = async(req,res)=>{
    try {
        const userid = req.user._id;
        const filteredUsers = await User.find({_id : { $ne : userid}}).select("-password");
        res.status(200).json({
            connectedUsers : filteredUsers
        })
    } catch (error) {
        console.log("error in getUser controller in user.controller.js : ",error.message);
        return res.status(500).json({
            error:"internal server error"
        })
    }
}

module.exports = {getUser};