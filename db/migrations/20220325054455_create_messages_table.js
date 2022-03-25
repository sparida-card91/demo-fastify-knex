/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const path = require('path');
require('../../initEnv');

exports.up = function(knex) {
    return knex.schema
      .createTable('messages_table', function (table) {
        table.integer('id').notNullable();
        table.string('message');
      });};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
      .dropTable('messages_table');  
};
