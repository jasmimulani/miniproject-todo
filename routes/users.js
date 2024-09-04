const express = require('express');
const { Login, logout, showRegisterUser, showLoginPage, dashboard, registerUser } = require('../controller/user-colntroller');
const  userrouter = express.Router();

//  registration handel
userrouter.get('/register',showRegisterUser);
userrouter.post('/register',registerUser);
userrouter.get('/login',showLoginPage);
userrouter.post('/login',Login);
// userrouter.get('/dashboard',dashboard);
userrouter.delete('/logout',logout);


module.exports = userrouter