// Require the framework and instantiate it
import Fastify from 'fastify'
import fastifyEnv from '@fastify/env'
import { envOptions } from './config/envConfig.js'

import dbInit from './db/dbInit.js'
import postgres from './plugins/postgres.js'
import health from './routes/api/health.js'
import strapiConfig from './routes/api/strapiConfig.js'

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
            app.log.debug(app.config)
            if (app.config.SERVER_SERVLET_CONTEXT_PATH && app.config.SERVER_SERVLET_CONTEXT_PATH != '/') {
                healthOpts.prefix = app.config.SERVER_SERVLET_CONTEXT_PATH
                strapiConfigOpts.prefix = app.config.SERVER_SERVLET_CONTEXT_PATH
                app.log.info('Set prefix to ' + app.config.SERVER_SERVLET_CONTEXT_PATH)
            }
            if (app.config.JWT_PUB_KEY) {
                app.log.info('Using public key for JWT verification: ' + app.config.JWT_PUB_KEY)
            } else {
                app.config.USER_ENDPOINT = app.config.KEYCLOAK_AUTH_URL + "/realms/" + app.config.KEYCLOAK_REALM + "/protocol/openid-connect/userinfo"
                app.log.info('Using introspection endpoint for JWT verification: ' + app.config.USER_ENDPOINT)
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