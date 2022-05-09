// REQUIRES ============================================================
const { Router } = require("express");
const { sendEmailController } = require("../controllers");

// CONSTANTS ===========================================================
const sendEmailRouter = new Router();

// ROUTES =============================================================
sendEmailRouter.post("/create",sendEmailController.sendMail);

//EXPORTS =============================================================

module.exports = sendEmailRouter;