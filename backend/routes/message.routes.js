const express = require('express');
const router = express.Router();
const {sendMessage , getMessage} = require('../controllers/messages.controller');
const protectRoute = require('../utils/protectRoute');

//authorization router : protectRoute ->detects logged in or not
router.post('/send/:id',protectRoute,sendMessage );

router.get('/:id' , protectRoute,getMessage);
















module.exports =  router;