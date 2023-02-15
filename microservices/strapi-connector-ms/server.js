'use strict'

const server = require('./app')({
    logger: {
        level: 'info'
    }
})

const serverOptions = {
    port: process.env.PORT || 3000,
    host: process.env.HOST || '0.0.0.0'
}

server.listen(serverOptions, (err, address) => {
    server.log.debug(server.config)
    if (err) {
        server.log.error(err)
        process.exit(1)
    }
})
