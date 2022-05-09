"use strict";
// REQUIRES ===============================================================
const { userModel } = require("../models");
const { generateUserToken } = require("../helpers/jwt");

// METHODS ================================================================
/**
 * Insert one new user
 * @param {*} body
 * @returns
 */
const facebookLogin = async (body,ip) => {
    var user = await userModel.findOne({where:body});
    if(!user){
        body.password = "FacebookAuthentication"
        const userData = new userModel(body);
        user =  await userData.save();
    }
    const token = generateUserToken(user.id, ip);
    const reflection = {token:token};
    const response = await userModel.update(reflection,{where:{username:body.username}});
    return {token:token};
}
// EXPORTS =================================================================
module.exports = {
    facebookLogin
};
