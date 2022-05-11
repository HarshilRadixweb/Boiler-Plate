"use strict";
/**
 * Requires
 */
const { appConfg } = require("./config");
const express = require("express");
const http = require("http");
const cors = require("cors");
const routes = require("./src/routes");
const logger = require("./src/helpers/logger");
const db = require("./src/models");
const passport = require("passport");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const {
	apiResponseMiddleware,
	apiNotFoundMiddleware,
	errorHandlerMiddleware,
} = require("./src/middleware");

/**
 * Mysql Connection
 */
console.log("Sequelize Sync");
db.sequelize.sync();
/**
 * Masala
 */
const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(
	cookieSession({
		name: "session",
		keys: ["TEST"],

		// Cookie Options
		maxAge: 24 * 60 * 60 * 1000, // 24 hours
	})
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(apiResponseMiddleware);
app.use(`/${appConfg.apiVersion}`, routes);
app.use(apiNotFoundMiddleware);
app.use(errorHandlerMiddleware);

/**
 * Server Initiation
 */
server.listen(appConfg.port, () => {
	logger.info(
		`${appConfg.project} service is listening to the port ${appConfg.port}.`
	);
});
