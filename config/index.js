"use strict";

require("dotenv").config();

const ENV_VARS = {
	appConfg: {
		port: process.env.PORT,
		apiVersion: process.env.API_VERSION,
		project: process.env.PROJECT_NAME,
	},
	jwtConfig: {
		jwtSecret: process.env.JWT_SECRET,
		expiresIn: `${(parseInt(process.env.EXPIRES_IN) * 60).toString()}s`,
	},
	mysql: {
		host: process.env.DB_HOST,

		username: process.env.DB_USERNAME,

		password: process.env.DB_PASSWORD,

		database: process.env.DB_NAME,

		dialect: "mysql",

		pool: {
			max: 5,

			min: 0,

			acquire: 30000,

			idle: 10000,
		},
	},
};
module.exports = ENV_VARS;
