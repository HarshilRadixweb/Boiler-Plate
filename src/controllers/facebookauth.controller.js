const passport = require("passport");
const strategy = require("passport-facebook");

const { facebookAuthService } = require("../services");

const FacebookStrategy = strategy.Strategy;

passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (obj, done) {
	done(null, obj);
});

passport.use(
	new FacebookStrategy(
		{
			clientID: process.env.FACEBOOK_CLIENT_ID,
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
			callbackURL: process.env.FACEBOOK_CALLBACK_URL,
			profileFields: ["email", "name"],
			passReqToCallback: true,
		},
		async function (req, accessToken, refreshToken, profile, done) {
			const { email, first_name, last_name } = profile._json;
			const ip = req.headers["x-real-ip"] || req.socket.remoteAddress;
			2;
			const data = await facebookAuthService.facebookLogin(
				{ username: email },
				ip
			);
			profile.token = data;
			done(null, profile);
		}
	)
);
