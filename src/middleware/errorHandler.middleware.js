"use strict";

// REQUIRES ================================================================
const { ER_BAD_REQUEST } = require("../constants/errorMessaegs.constants");
const { RESPONSE } = require("../constants/app.constants");

// METHODS =================================================================
const errorHandlerMiddleware = (err, req, res, next) => {
    const apiResponse = {
        response_code: RESPONSE.ERROR.code,
        error: {
            code: err.code || ER_BAD_REQUEST.code,
            message: err.message || ER_BAD_REQUEST.message,
            field: err.field,
            type: err.type || ER_BAD_REQUEST.type,
        },
        data: {},
    };
    return res.status(200).send(apiResponse);
};

// EXPORTS =================================================================
module.exports = errorHandlerMiddleware;
