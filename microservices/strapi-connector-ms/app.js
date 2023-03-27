// Require the framework and instantiate it
import Fastify from 'fastify'
import fastifyEnv from '@fastify/env'
import { envOptions } from './config/envConfig.js'

import dbInit from './db/dbInit.js'
import postgres from './plugins/postgres.js'
import health from './routes/api/health.js'
import strapiConfig from './routes/api/strapiConfig.js'
import { appConstants } from './config/appConstants.js'

function buildApp(opts = {}) {
    const app = Fastify(opts)

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

            app.addHook('onReady', dbInit)

            app.register(postgres, app.config)
            app.register(health, healthOpts)
            app.register(strapiConfig, strapiConfigOpts)
        }
    )

    return app
}

export default buildApp