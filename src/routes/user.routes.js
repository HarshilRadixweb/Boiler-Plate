"use strict";

// REQUIRES ============================================================
const { Router } = require("express");
const {
	userController,
	googleAuthController,
	facebookAuthController,
} = require("../controllers");
const { apiAuthMiddleware } = require("../middleware");
const passport = require("passport");

// CONSTANTS ===========================================================
const userRouter = new Router();
userRouter.use(passport.initialize());

// REQUEST DEFINITIONS =================================================
userRouter.post("/create", userController.userCreate);
userRouter.put("/login", userController.userLogin);

//GOOGLE ==============================================================
userRouter.get("/googleAuth", googleAuthController.googleAuth);
userRouter.get("/googleAuthCallback", googleAuthController.googleAuthCallback);

//FACE BOOK =============================================
userRouter.get(
	"/auth/facebook",
	passport.authenticate("facebook", {
		scope: ["email"],
	})
);

userRouter.get(
	"/auth/facebook/callback",
	passport.authenticate("facebook", {
		successRedirect: "/v1/user/success/",
		failureRedirect: "/fail",
	})
);

userRouter.get("/fail", (req, res) => {
	res.send("Failed attempt");
});

userRouter.get("/success", (req, res, next) => {
	res.send(req.user.token);
});

// REQUESTS BELOW HERE REQUIRE AUTHENTICATION.==================================
userRouter.use(apiAuthMiddleware);

userRouter.put("/logout", userController.userLogout);

// EXPORTS =============================================================
module.exports = userRouter;
