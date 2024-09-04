const User = require('../models/User')
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('connect-flash')

exports.showRegisterUser = (req, res) => res.render('register');

exports.registerUser = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email, isDelete: false });
        const { name, email, password, password2 } = req.body;
        if (user) {
            req.flash('error_msg', 'Email already exists');
            return res.redirect('/users/register');
        }
        else if (!name || !email || !password || !password2) {
            req.flash('error_msg', 'Please fill in all fields');
            return res.redirect('/users/register'); 
        }
        else if (password != password2) {
            req.flash('error_msg', 'Passwords do not match');
            return res.redirect('/users/register');
        }
        if(req.file){
            imagePath = req.file.path.replace(/\\/g ,"/") 
         }
        let hashpass = await bcrypt.hash(req.body.password, 10)
        user = await User.create({ ...req.body, password: hashpass , profileImage:imagePath });
        req.flash('success_msg', 'You are now registered and can log in');
        return res.redirect('/users/login');
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "internal server error" })
    }
};


// login handel
exports.showLoginPage = (req, res) => res.render('login');

exports.Login = async (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/todo',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);  
};

//  logout handel
exports.logout = async (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }
        req.flash('success_msg', 'You are logged out');
        res.redirect('/users/login');
    });
};

// exports.dashboard = (req, res) => res.render('/dashboard');

