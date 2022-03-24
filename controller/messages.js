const knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : '127.0.0.1',
      port : 3306,
      user : 'root',
      password : 'MyRootPa$$word',
      database : 'mysql_test_db'
    }
  });

// let messages = [
//     {
//         id: 1,
//         message: 'Test Message 1'
//     },
//     {
//         id: 2,
//         message: 'Test Message 2'
//     },
//     {
//         id: 3,
//         message: 'Test Message 3'
//     }
// ]

const getAllMessages = async (req, reply) => {
    return knex('messages_table').select()
}

const getMessage = async (req, reply) => {
    //const id = Number(req.params.id)
    //console.log("Hello World", id)
    return knex('messages_table').select()
}

const addMessage = async (req, reply) => {
    const id = messages.length + 1
    const newMessage = {
        id,
        message: req.body.message
    }

    messages.push(newMessage)
    return newMessage
}

const modifyMessage = async (req, reply) => {
    const id = Number(req.params.id)
    messages = messages.map(message => {
        if (message.id === id) {
            return {
                id,
                message: req.body.message
            }
        }
        else {
            return {
                id: message.id,
                message: message.message 
            }        
        }
    })

    return {
        id,
        message: req.body.message
    }
}

const deleteMessage = async (req, reply) => {
    const id = Number(req.params.id)

    messages = messages.filter(message => message.id !== id)
    return { msg: `Message ID ${id} deleted` }
}

module.exports = {
    getAllMessages,
    getMessage,
    addMessage,
    modifyMessage,
    deleteMessage
}