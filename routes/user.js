const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const passport = require('passport');
const { saveRedirectUrl } = require('../middleware');
const userController = require('../controllers/users');

router.get("/signup",userController.renderSignUpForm);

router.post("/signup",wrapAsync(userController.Signup));

router.get("/login",userController.renderLoginForm)

router.post("/login",
    saveRedirectUrl,
    passport.authenticate("local",
        {failureRedirect :'/login',
        failureFlash:true
    }),
    userController.Login
);


router.get("/logout",userController.Logout);

module.exports = router;