//const express = require('express');
//const bodyParser = require('body-parser');
const port = 3000;
const app = require('fastify')({
    logger: true
})

//app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Hello World'
    });
});

app.listen(port, (err, address) => {
    if (err) {
        app.log.error(err)
        process.exit(1)
    }
    app.log.info(`Starting server on ${address}`)
});
