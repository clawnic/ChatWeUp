const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true 
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    gender:{
        type:String,
        requriede:true,
        enum:["male","female"]
    },
    profilePic:{
        type:String,
        default:"",
    },
    //created at and updated at => member since <created at>
},{timestamps:true});

const User = mongoose.model("User",userSchema);
module.exports =User