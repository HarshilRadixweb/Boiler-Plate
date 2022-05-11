"use strict";

const jwt = require("jsonwebtoken");
const { jwtConfig } = require("../../../config");

/**
 * Decode user api token
 * @param {*} token
 * @returns
 */
const decodeUserToken = (token) => {
	try {
		const decodedToken = jwt.verify(token, jwtConfig.jwtSecret);
		return decodedToken;
	} catch (error) {
		throw error;
	}
};

/**
 * Generate user api token
 * @param {*} _userId
 * @param {*} ip
 * @returns
 */
const generateUserToken = (_userId, ip) => {
	try {
		const generateToken = jwt.sign({ _userId, ip }, jwtConfig.jwtSecret, {
			expiresIn: jwtConfig.expiresIn,
		});
		return generateToken;
	} catch (error) {
		throw error;
	}
};

module.exports = {
	decodeUserToken,
	generateUserToken,
};
