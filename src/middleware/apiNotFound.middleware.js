"use strict";

// REQUIRES ===============================================================================
const { ER_API_NOT_FOUND } = require("../constants/errorMessaegs.constants");

// METHODS ================================================================================
/**
 * If API is not found then return error
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const apiNotFoundMiddleware = (req, res, next) => {
	next(ER_API_NOT_FOUND);
};

// EXPORTS ================================================================================
module.exports = apiNotFoundMiddleware;
