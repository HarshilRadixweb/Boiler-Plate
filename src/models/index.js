"use strict";

// REQUIRES =====================================================================
const Sequelize = require("sequelize");
const { mysql } = require("../../config");

// CONSTANTS ====================================================================
const sequelize = new Sequelize(
	mysql.database,
	mysql.username,
	mysql.password,
	{
		logging: false,
		host: mysql.host,
		dialect: mysql.dialect,
		operatorsAliases: false,
		// dialectOptions: {
		// 	socketPath: `/cloudsql/${mysql.db_instance}`,
		// },
		//   define: {
		//     timestamps: false
		// },

		pool: {
			max: mysql.pool.max,
			min: mysql.pool.min,
			acquire: mysql.pool.acquire,
			idle: mysql.pool.idle,
		},
	}
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.userModel = require("./user.model")(sequelize, Sequelize);

module.exports = db;
