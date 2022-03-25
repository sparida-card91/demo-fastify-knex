const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig[process.env.NODE_ENV])
const messageController = require('../controller/messages');

beforeAll(async () => {
    let exists = await knex.schema.hasTable('messages_table')
    if (exists) {
        await knex('messages_table').del();
    } else {
        await knex.schema
        .createTable('messages_table', function (table) {
          table.integer('id').notNullable();
          table.string('message');
        });         
    }
    await knex('messages_table').insert([
        {id: 1, message: 'Test Message 1'},
        {id: 2, message: 'Test Message 2'},
        {id: 3, message: 'Test Message 3'}
    ]); 
    
});

afterAll(async () => {
    let exists = await knex.schema.hasTable('messages_table')
    if (exists) {
        await knex('messages_table').truncate();
    }    
    await knex.destroy();
});

test('Test Get All Messages', async () => {
    let messages =  await messageController.getAllMessagesHelper()
    let expectedMessages =     [
        { id: 1, message: 'Test Message 1' },
        { id: 2, message: 'Test Message 2' },
        { id: 3, message: 'Test Message 3' }
      ]
    //console.log(messages)
    expect(messages).toStrictEqual(expectedMessages);
  });

test('Test Get Specific Messages Based On ID', async () => {
    let id = 2
    let message =  await messageController.getMessageHelper(id)
    let expectedMessage =     [
        { id: 2, message: 'Test Message 2' },
      ]
    //console.log(message)
    expect(message).toStrictEqual(expectedMessage);
  });

test('Test Add Message', async () => {
    let messageString = "Hello World"
    let newMessage = await messageController.addMessageHelper(messageString)
    await messageController.insertMessage(newMessage)

    let messages =  await messageController.getAllMessagesHelper()
    let expectedMessages =     [
        { id: 1, message: 'Test Message 1' },
        { id: 2, message: 'Test Message 2' },
        { id: 3, message: 'Test Message 3' },
        { id: 4, message: 'Hello World' },
      ]
    //console.log(messages)
    expect(messages).toStrictEqual(expectedMessages);
  });

test('Test Modify Message', async () => {
    let id = 2
    let messageString = "Test Message 2 Modified"
    await messageController.modifyMessageHelper(id, messageString)

    let messages =  await messageController.getAllMessagesHelper()
    let expectedMessages =         [
        { id: 1, message: 'Test Message 1' },
        { id: 2, message: 'Test Message 2 Modified' },
        { id: 3, message: 'Test Message 3' },
        { id: 4, message: 'Hello World' }
      ]
    //console.log(messages)
    expect(messages).toStrictEqual(expectedMessages);
  });

test('Test Delete Message', async () => {
    let id = 4
    await messageController.deleteMessageHelper(id)

    let messages =  await messageController.getAllMessagesHelper()
    let expectedMessages =         [
        { id: 1, message: 'Test Message 1' },
        { id: 2, message: 'Test Message 2 Modified' },
        { id: 3, message: 'Test Message 3' }
      ]
    //console.log(messages)
    expect(messages).toStrictEqual(expectedMessages);
  });