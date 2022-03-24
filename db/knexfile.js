// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  staging: {
    client: 'mysql',
    connection: {
      host : 'localhost',
      port : 3306,
      user : 'root',
      password : 'MyRootPa$$word',
      database : 'mysql_test_db'
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
