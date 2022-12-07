const db_constants = require("../constants");

/**
 * @type { Object.<string, import("../node_modules/knex/types").Knex.Config> }
 */
module.exports = {
	development: {
		client: "postgresql",
		connection: {
			database: db_constants.DB_DEV_NAME,
			user: db_constants.DB_DEV_USER,
			password: db_constants.DB_DEV_PASS,
		},
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			tableName: "knex_migrations",
		},
	},

	staging: {},

	production: {},
};
