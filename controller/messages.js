let messages = [
    {
        id: 1,
        message: 'Test Message 1'
    },
    {
        id: 2,
        message: 'Test Message 2'
    },
    {
        id: 3,
        message: 'Test Message 3'
    }
]

const getAllMessages = async (req, reply) => {
    return messages
}

const getMessage = async (req, reply) => {
    const id = Number(req.params.id)
    const message = messages.find(message => message.id === id)
    return message
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