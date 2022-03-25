// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const path = require('path');
require('./initEnv');

module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host : process.env.MYSQL_HOST,
      port : process.env.MYSQL_PORT,
      user : process.env.MYSQL_USER,
      password : process.env.MYSQL_PASSWORD,
      database : process.env.MYSQL_DB
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/db/migrations`
    },
    seeds: {
      directory: `${__dirname}/db/seeds`
    }
  }
};


