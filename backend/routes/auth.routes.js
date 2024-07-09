const express = require('express');
const router = express.Router();

const {    loginUser,
    logoutUser,
    signupUser} = require('../controllers/auth.controller')

router.post('/signup' , signupUser);
router.post('/login',loginUser);
router.post('/logout', logoutUser);


module.exports =  router;

