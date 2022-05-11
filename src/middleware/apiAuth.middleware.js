"use strict";

// REQUIRES =======================================================================
const { decodeUserToken } = require("../helpers/jwt");
const {
	ER_UNAUTHORIZED_CLIENT,
} = require("../constants/errorMessaegs.constants");
const { RESPONSE } = require("../constants/app.constants");
const { findOneUser } = require("../services/user.service");

// METHODS =========================================================================
/**
 * API Authentication Method
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const apiAuthMiddleware = async (req, res, next) => {
	try {
		const requestIP = req.headers["x-real-ip"] || req.socket.remoteAddress;
		let token = req.headers.authorization || false;
		if (token && token.startsWith("Bearer ")) {
			token = token.slice(7, token.length);
			const decodedToken = decodeUserToken(token);
			const _userId = decodedToken._userId || false;
			const tokenIP = decodedToken.ip || false;

			if (_userId && tokenIP && tokenIP === requestIP) {
				const filter = { _id: _userId };
				const user = await findOneUser(filter);
				if (user && user.token === token) {
					req._userId = _userId;
					return next();
				}
			}
		}

		throw ER_UNAUTHORIZED_CLIENT;
	} catch (error) {
		const apiResponse = {
			response_code: RESPONSE.ERROR.code,
			error: {
				message: ER_UNAUTHORIZED_CLIENT.message,
				code: ER_UNAUTHORIZED_CLIENT.code,
				type: ER_UNAUTHORIZED_CLIENT.type,
			},
			data: {},
		};
		return res.status(200).send(apiResponse);
	}
};

// EXPORTS ==================================================================
module.exports = apiAuthMiddleware;
