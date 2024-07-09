const express = require('express');
const router = express.Router();
const {getUser} = require('../controllers/user.controller');
const protectRoute = require('../utils/protectRoute');

router.get('/',protectRoute,getUser);

module.exports = router;