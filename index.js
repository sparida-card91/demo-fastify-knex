const port = 3000;
const app = require('fastify')({
    logger: true
})

app.setErrorHandler(function (error, request, reply) {
    console.log(error) 
    reply.status(500).send({ message: 'Error in processing request due to db failure' })
  })

app.get('/', (req, res) => {
    res.send({
        message: 'Hello World'
    });
});

const messageRoutes = require('./routes/messages')
messageRoutes.forEach((route, index) => {
    app.route(route)
})

app.listen(port, (err, address) => {
    if (err) {
        app.log.error(err)
        process.exit(1)
    }
    app.log.info(`Starting server on ${address}`)
});
