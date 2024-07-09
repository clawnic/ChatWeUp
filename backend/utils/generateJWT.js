const jwt = require('jsonwebtoken');

const generateToken = (userId , res)=>{
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '15d' });
    res.cookie("jwt",token,{
        maxAge: 15 * 60 * 60 * 24 * 1000,  //ms
        httpOnly: true,                    //prevent XSS attacks cross-site scripting attacks
        secure: process.env.NODE_ENV !== 'production', //CSRF attacks cross-site request forgery attacks
        sameSite: "strict"
    });
};

module.exports = {generateToken};