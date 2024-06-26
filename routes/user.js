const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/user.js");


router.
    route("/signUp")
    .get(userController.renderSignUpForm)
    .post(wrapAsync(userController.signup));

//router.get("/signUp",userController.renderSignUpForm);
//router.post("/signUp",wrapAsync(userController.signup));

router.route("/login")
.get(userController.renderLoginForm)
.post(
    saveRedirectUrl,
    passport.authenticate("local",{
        failureRedirect : "/login",
        failureFlash:true,
    }),
    userController.logIn
    );
// router.get("/login",userController.renderLoginForm);

// router.post(
//     "/login",
//     saveRedirectUrl,
//     passport.authenticate("local",{
//         failureRedirect : "/login",
//         failureFlash:true,
//     }),
//     userController.logIn
//     );

router.get("/logout",userController.logout);
module.exports = router;
