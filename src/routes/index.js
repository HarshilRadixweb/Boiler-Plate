"use strict";

// REQUIRES ============================================================
const router = new require("express").Router();
const userRoutes = require("./user.routes");
const sendEmail = require("./sendEmail.routes");

// ROUTER USES =========================================================
router.use("/user", userRoutes);
router.use("/sendEmail", sendEmail);

// EXPORTS =============================================================
module.exports = router;
