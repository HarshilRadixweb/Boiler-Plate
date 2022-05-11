"use strict";

// REQUIRES ================================================================
const mung = require("express-mung");
const { RESPONSE } = require("../constants/app.constants");

// METHODS =================================================================
/**
 * Default response pattern for all APIs
 * @param {*} body
 * @param {*} req
 * @param {*} res
 * @returns
 */
const apiResponseMiddleware = (body, req, res) => {
	if (body.response_code === RESPONSE.ERROR.code) return body;
	return {
		response_code: RESPONSE.SUCCESS.code,
		message: body.message || RESPONSE.SUCCESS.message,
		data: body || {},
	};
};

// EXPORTS ==================================================================
module.exports = mung.json(apiResponseMiddleware);
