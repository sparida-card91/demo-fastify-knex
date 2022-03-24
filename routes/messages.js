const messageController = require('../controller/messages');

const getMessageValidation = {
    params: {
        id: { type: 'string' }
    },
    response: { 
        200: {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                message: { type: 'string' }
            }
        }
    }
}

const addMessageValidation = {
    body: {
        type: 'object',
        required: [
            'message'
        ],
        properties: {
            message: { type: 'string' }
        }
    },
    response: {
        200: {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                message: { type: 'string' }
            }
        }
    }
}

const routes = [{
        method: 'GET',
        url: '/api/messages',
        handler: messageController.getAllMessages
    },
    {
        method: 'GET',
        url: '/api/messages/:id',
        schema: getMessageValidation,
        handler: messageController.getMessage
    },
    {
        method: 'POST',
        url: '/api/messages',
        schema: addMessageValidation,
        handler: messageController.addMessage
    },
    {
        method: 'PUT',
        url: '/api/messages/:id',
        handler: messageController.modifyMessage
    },
    {
        method: 'DELETE',
        url: '/api/messages/:id',
        handler: messageController.deleteMessage
    }
]

module.exports = routes