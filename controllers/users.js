const User = require("../models/user");


module.exports.signUpForm = (req,res)=>{
    res.render("users/signup.ejs");
};

module.exports.signUp = async(req,res)=>{
    try{
    let {username, email, password} = req.body;
    const newUser = new User({email,username});
    const registerUser = await User.register(newUser,password);
    req.login(registerUser, (err)=>{
        if(err){
          return next(err);
        }
        req.flash("success","Welcome to Wanderlust");
        res.redirect("/listings");
    });      
    } catch(err){
        req.flash("error",err.message);
        res.redirect("/signup");
    }
};

module.exports.loginForm = (req,res)=>{
    res.render("users/login.ejs");
};

module.exports.login = async(req,res)=>{
     req.flash("success","Welcome to Wanderlust! You are logged in");
     let redirectUrl = res.locals.redirectUrl || "/listings";
     res.redirect(redirectUrl);
};


module.exports.logout = (req,res,next)=>{
     req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","logged you out!");
        res.redirect("/listings");
     });
};