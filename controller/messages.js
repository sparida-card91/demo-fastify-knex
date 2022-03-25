const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig[process.env.NODE_ENV])

const getAllMessagesHelper = async () => {
    let messages  = await knex('messages_table').select()
    return messages
}
const getAllMessages = async (req, reply) => {
    let messages = await getAllMessagesHelper()
    reply.send(messages)
}

const getMessageHelper = async (id) => {
    let message = await knex('messages_table').select().where('id', id)
    return message
}

const getMessage = async (req, reply) => {
    const id = Number(req.params.id)
    let message = await getMessageHelper(id)
    reply.send(message)
}

const addMessageHelper = async (message) => {
    let total = await knex('messages_table').count('id as CNT')
    let id = total[0].CNT + 1
    let newMessage = {
        id,
        message: message
    }
    return newMessage
}
const insertMessage = async (newMessage) => {
    let result = await knex('messages_table').insert(newMessage)
    return result
}

const addMessage = async (req, reply) => {
    let newMessage = await addMessageHelper(req.body.message)
    let result = await insertMessage(newMessage)
    reply.send(result)
}

const modifyMessageHelper = async (id, message) => {

    await knex('messages_table')
    .where('id', '=', id)
    .update({
      message: message
    })
    
    return({
        id,
        message: message
    })
}

const modifyMessage = async (req, reply) => {

    const id = Number(req.params.id)
    
    let result = await modifyMessageHelper(id, req.body.message)
    reply.send(result)
}

const deleteMessageHelper = async (id) => {
    await knex('messages_table').where({ id: id }).del()
    return({ msg: `Message ID ${id} deleted` })
}

const deleteMessage = async (req, reply) => {
    const id = Number(req.params.id)
    let result = await deleteMessageHelper(id)
    reply.send(result)
}

module.exports = {
    getAllMessagesHelper,
    getAllMessages,
    getMessageHelper,
    getMessage,
    addMessageHelper,
    insertMessage,
    addMessage,
    modifyMessageHelper,
    modifyMessage,
    deleteMessageHelper,
    deleteMessage,
}