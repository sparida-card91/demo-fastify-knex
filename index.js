const port = 3000;
const app = require('fastify')({
    logger: true
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
