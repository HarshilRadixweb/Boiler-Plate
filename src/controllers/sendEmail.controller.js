"use strict";
// REQUIRES ==============================================================
const nodemailer = require("nodemailer");

// Controller ============================================================

const sendMail = (req, res, next) => {
	try {
		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: process.env.NODEMAILER_USER_NAME,
				pass: process.env.NODEMAILER_PASSWORD,
			},
		});

		const mailOptions = {
			from: process.env.NODEMAILER_USER_NAME,
			to: req.body.reciver,
			subject: req.body.subject,
			text: req.body.content,
		};

		const data = transporter.sendMail(mailOptions);
		return res.send(data);
	} catch (err) {
		return next(err);
	}
};

module.exports = {
	sendMail,
};
