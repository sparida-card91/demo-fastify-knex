/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

require('../../initEnv');

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('messages_table').del()
  await knex('messages_table').insert([
    {id: 1, message: 'Test Message 1'},
    {id: 2, message: 'Test Message 2'},
    {id: 3, message: 'Test Message 3'}
  ]);
};
