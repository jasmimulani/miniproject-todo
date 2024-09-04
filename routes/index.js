const express = require('express')
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const User = require('../models/User');


router.get('/',(req,res) =>res.render('welcome'))

router.get('/dashbord',ensureAuthenticated,(req,res) =>
    res.render('dashboard',{
        name: req.user.name
    }));


   
module.exports = router;
