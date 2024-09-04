const User = require('../models/User')
const bcrypt = require ('bcrypt')
const passport =  require('passport')

exports.showRegisterUser= (req,res)=>res.render('register')

exports.adduser= async (req,res) =>{
    try {
        let user = await User.findOne({email:req.body.email ,isDelete:false});
        const {name,email,password,password2} = req.body;
        if(user){   
            return res.render('error/exist.ejs');

        }
        else if(!name || !email || !password ||!password2){

            return res.render('error/fill-info.ejs');
        }
        else if (password != password2){
            return res.render('error/passmis.ejs')
        }
        

        let hashpass = await bcrypt.hash(req.body.password,10)
        user = await User.create({...req.body , password:hashpass});
        return res.render('error/success.ejs')
    } catch (err) {
        console.log(err);
        res.status(500).json({msg:"internal server erro"})
          
    }
};
// login handel
exports.showLoginPage = (req,res)=>res.render('login')
exports.Login = async (req , res ,next) =>{
    passport.authenticate('local', {
        successRedirect: '/todo',
        failureRedirect: '/users/login',
        failureFlash: true
      })(req, res, next);
    };

    //  logout handel
exports.dashboard = (req,res) => res.render('dashboard')
    exports.logout = async (req, res, next) => {
        req.logout((err) => {
            if (err) { return next(err); }
            req.flash('success_msg', 'You are logged out');
            res.redirect('/users/login');
        });
    };
    
    exports.dashboard = (req,res)=> res.render('dashboard')

