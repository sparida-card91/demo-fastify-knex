const knexConfig = require('../db/knexfile');
const knex = require('knex')(knexConfig[process.env.NODE_ENV])

const getAllMessages = async (req, reply) => {
    reply.send(
        await knex('messages_table').select()
     )
}

const getMessage = async (req, reply) => {
    const id = Number(req.params.id)
    reply.send(
       await knex('messages_table').select().where('id', id)
    )
}

const addMessage = async (req, reply) => {
    let newMessage;
    knex('messages_table').count('id as CNT')
      .then((total) => {
        let id = total[0].CNT + 1
        console.log("Hello Everyone", id)
        newMessage = {
            id,
            message: req.body.message
        }
        return knex('messages_table').insert(newMessage)
      })
      .then((result) => {
        reply.send(result)
      })
      .catch((err) => {
          console.log(err)
          reply.send("Error")
      })
}

const modifyMessage = async (req, reply) => {

    const id = Number(req.params.id)

    await knex('messages_table')
    .where('id', '=', id)
    .update({
      message: req.body.message
    })
    
    reply.send({
        id,
        message: req.body.message
    })
}

const deleteMessage = async (req, reply) => {
    const id = Number(req.params.id)
    await knex('messages_table').where({ id: id }).del()
    reply.send({ msg: `Message ID ${id} deleted` })
}

module.exports = {
    getAllMessages,
    getMessage,
    addMessage,
    modifyMessage,
    deleteMessage
}