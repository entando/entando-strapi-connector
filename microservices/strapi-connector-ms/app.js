'use strict'

// Require the framework and instantiate it
const fastify = require('fastify')
const fastifyEnv = require('@fastify/env')

const envOptions = require('./config/envConfig')

function build(opts = {}) {
    const app = fastify(opts)
    var healthOpts = { logLevel: 'warn' }
    var strapiConfigOpts = {}

    app.register(fastifyEnv, envOptions).after(
        err => {
            if (err) {
                app.log.error(err)
                process.exit(1)
            }
            if (app.config.SERVER_SERVLET_CONTEXT_PATH && app.config.SERVER_SERVLET_CONTEXT_PATH != '/') {
                healthOpts.prefix = app.config.SERVER_SERVLET_CONTEXT_PATH
                strapiConfigOpts.prefix = app.config.SERVER_SERVLET_CONTEXT_PATH
                app.log.info('Set prefix to ' + app.config.SERVER_SERVLET_CONTEXT_PATH)
            }
            app.register(require('./plugins/postgres'), app.config)
            app.register(require('./routes/api/health'), healthOpts)
            app.register(require('./routes/api/strapiConfig'), strapiConfigOpts)
        }
    )

    return app
}

module.exports = build
