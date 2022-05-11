"use strict";

const { appConfg } = require("../../../config");
const log4js = require("log4js");

const logger = log4js.getLogger(`[${appConfg.project}]`);
logger.level = "info";

module.exports = logger;
