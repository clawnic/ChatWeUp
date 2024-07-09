const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const {generateToken} = require('../utils/generateJWT');

const loginUser = async(req,res)=>{
    //user only gives username and password thru req body
    
    try{
        
        const {username, password} = req.body;
        
        const user = await User.findOne({username});
        
        const isPassword = await bcrypt.compare(password,user?.password||"");
        

        if(!user || !isPassword){
            return res.status(400).json({error:"Invalid username or password"});
        }
        

        if(user)generateToken(user._id,res);
        

        res.status(200).json({
            _id:user._id,
            fullname:user.fullname,
            username:user.username,
            profilePic:user.profilePic,
        });
        

    }catch(e){
        console.log("Error in loginUser controller:",e.message);
        return res.status(500).json({error:"Internal sever error"});
    }
}

const logoutUser = (req,res)=>{
    try{
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"Logged out successfully"});
    }catch(e){
        console.log("error in logout controller:",e.message);
        return res.status(500).json({error:"Internal sever error"});
    }
}

const signupUser = async(req,res)=>{
    const {fullname , username , password , confirmPassword , gender}=req.body;

    try{
        if(password != confirmPassword){
            return res.status(400).json({
                error:"password do not match"
            })
        }

        const user = await User.findOne({username});
        if(user)return res.status(400).json({error:"username already exist"});

        //hash passwords here
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const bORg = gender==='male'?'boy':'girl';
        const profilePic = `https://avatar.iran.liara.run/public/${bORg}?username=${username}`;

        const newUser = new User({
            fullname,
            username,
            password:hashedPassword,
            gender,
            profilePic
        });

        if(newUser){
            //generate JWT here
            generateToken(newUser._id,res);
            await newUser.save();
            res.status(200).json({
                _id:newUser._id,
                fullname:newUser.fullname,
                username:newUser.username,
                profilePic:newUser.profilePic
            });
        }else{
            res.status(400).json({error:"Invalid User data"});
        }


    }catch(e){
        console.log("error in singup controller:",e.message);
        res.status(500).json({error:"Internal sever error"});
    }   
}

module.exports = {
    loginUser,
    logoutUser,
    signupUser
}