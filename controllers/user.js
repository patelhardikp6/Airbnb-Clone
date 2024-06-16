const User = require("../models/user.js");

module.exports.renderSignUpForm =  (req,res) => {
    res.render("users/signup.ejs");
};

module.exports.signup = async(req,res) => {
    try{
    let{username , email , password} = req.body;
    const newUser = new User({email , username});
    const rgUser = await User.register(newUser,password);
    console.log(rgUser);
    req.login(rgUser,(err) => {
        if(err){
            return nxt(err);
        }
        req.flash("success","Welcome to wanderlust");
        res.redirect("/listings");
    })
    }
    catch(e){
        req.flash("error",e.message);
        res.redirect("/signUp");
    }
};

module.exports.renderLoginForm = (req,res) => {
    res.render("users/login.ejs");
};

module.exports.logIn = async (req,res) => {
    req.flash("success","Welcome back to Wnaderlust! You are logged In");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout = (req,res,next) => {
    req.logout((err) => {
        if(err){
          return next(err);
        }
        req.flash("success","you are logged out");
        res.redirect("/listings");
    });
}