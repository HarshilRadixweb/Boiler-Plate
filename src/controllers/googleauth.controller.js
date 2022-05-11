// REQUIRES ==============================================================
const { google } = require("googleapis");
const { googleAuthService } = require("../services");
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URL = process.env.REDIRECT_URL;

const oAuth2Client = new google.auth.OAuth2(
	CLIENT_ID,
	CLIENT_SECRET,
	REDIRECT_URL
);
var authed = false;

// CONTROLLERS ===========================================================
const googleAuth = async (req, res, next) => {
	try {
		if (!authed) {
			// Generate an OAuth URL and redirect there
			const url = oAuth2Client.generateAuthUrl({
				access_type: "offline",
				scope: "https://www.googleapis.com/auth/gmail.readonly",
			});
			res.redirect(url);
		} else {
			const gmail = google.gmail({ version: "v1", auth: oAuth2Client });
			const userProfile = await gmail.users.getProfile({
				auth: oAuth2Client,
				userId: "me",
			});
			const email = userProfile.data.emailAddress;
			const ip = req.headers["x-real-ip"] || req.socket.remoteAddress;
			const data = await googleAuthService.googleLogin(
				{ username: email },
				ip
			);
			return res.send(data);
		}
	} catch (error) {
		return next(error);
	}
};

const googleAuthCallback = async (req, res, next) => {
	try {
		const code = req.query.code;
		if (code) {
			// Get an access token based on our OAuth code
			oAuth2Client.getToken(code, function (err, tokens) {
				if (err) {
					console.log("Error authenticating");
					console.log(err);
				} else {
					console.log("Successfully authenticated");
					oAuth2Client.setCredentials(tokens);
					authed = true;
					res.redirect("/v1/user/googleAuth");
				}
			});
		}
	} catch (error) {
		return next(error);
	}
};

//EXPORTS=============================================================================

module.exports = {
	googleAuth,
	googleAuthCallback,
};
