module.exports = (sequelize, Sequelize) => {
	const Users = sequelize.define(
		"users",
		{
            username: {
				type: Sequelize.STRING,
				allowNull: false,
			},
            password: {
                type: Sequelize.STRING,
				allowNull: false,
            },
			token:{
				type: Sequelize.STRING,
			},
        	createdAt: {
				field: "created_at",
				type: Sequelize.DATE,
			},
			updatedAt: {
				field: "updated_at",
				type: Sequelize.DATE,
			},
		},
		{
			freezeTableName: true,
		}
	);

	return Users;
};
