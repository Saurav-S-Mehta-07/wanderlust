const User = require("../models/user");

module.exports.renderSignUpForm = (req,res)=>{
    res.render("users/signup");
};

module.exports.Signup = async(req,res)=>{
    try{
        let {username, email, password} = req.body;
        const newUser = new User({email,username});
        const registeredUser = await User.register(newUser,password);
        req.login(registeredUser,(err)=>{
             if(err){
               return next(err);
             }
             req.flash("success","Welcome to ChillCasa");
             res.redirect("/listings");
        });
    } 
    catch(err){
        req.flash("error", err.message);
        res.redirect("/signup");
    }
}

module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login.ejs");
};

module.exports.Login =  async(req,res)=>{
        req.flash("success","Welcome back to ChillCasa");
        let redirectUrl = res.locals.redirectUrl || "/listings";
        res.redirect(redirectUrl);
};

module.exports.Logout = (req,res,next)=>{
   req.logout((err)=>{
      if(err){
        return next(err);
      }
      req.flash("success","you are logged out!");
      res.redirect("/listings");
   })
};