const express = require('express');
const { adduser,  Login, logout, showRegisterUser, showLoginPage, dashboard } = require('../controller/user-colntroller');
const  userrouter = express.Router();





//  registration handel
userrouter.post('/register',adduser);
userrouter.get('/register',showRegisterUser);
userrouter.post('/login',Login);
userrouter.get('/login',showLoginPage);
// userrouter.get('/dashboard',dashboard);
userrouter.get('/logout',logout);


module.exports = userrouter