require("dotenv").config({ path: "../.env" });

/**
 * @type { Object.<string, import("../node_modules/knex/types").Knex.Config> }
 */

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      host: process.env.DB_DEV_HOST_DEV,
      database: process.env.DB_DEV_NAME_DEV,
      user: process.env.DB_DEV_USER_DEV,
      password: process.env.DB_DEV_PASS_DEV,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  testing: {
    client: "postgresql",
    connection: {
      host: process.env.DB_DEV_HOST_TEST,
      database: process.env.DB_DEV_NAME_TEST,
      user: process.env.DB_DEV_USER_TEST,
      password: process.env.DB_DEV_PASS_TEST,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "postgresql",
    connection: {
      host: process.env.DB_DEV_HOST_PROD,
      database: process.env.DB_DEV_NAME_PROD,
      user: process.env.DB_DEV_USER_PROD,
      password: process.env.DB_DEV_PASS_PROD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
