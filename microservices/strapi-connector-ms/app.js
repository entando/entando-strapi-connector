'use strict'

// Require the framework and instantiate it
const fastify = require('fastify')
const fastifyEnv = require('@fastify/env')

const envSchema = {
    type: 'object',
    required: ['SERVER_SERVLET_CONTEXT_PATH',
                'SPRING_DATASOURCE_USERNAME',
                'SPRING_DATASOURCE_PASSWORD',
                'SPRING_DATASOURCE_URL',
                'APP_ORIGIN',
                'KEYCLOAK_REALM',
                'KEYCLOAK_AUTH_URL',
                'KEYCLOAK_CLIENT_SECRET',
                'KEYCLOAK_CLIENT_ID'
            ],
    properties: {
        SERVER_SERVLET_CONTEXT_PATH: {
            type: 'string',
            default: '/'
        },
        SPRING_DATASOURCE_USERNAME: {
            type: 'string',
            default: 'entando-strapi-connector-user'
        },
        SPRING_DATASOURCE_PASSWORD: {
            type: 'string',
            default: 'entando-strapi-connector-password'
        },
        SPRING_DATASOURCE_URL: {
            type: 'string',
            default: 'jdbc:postgresql://localhost:5432/entando-strapi-connector'
        },
        APP_ORIGIN: {
            type: 'string',
            default: 'http://localhost:3000'
        },
        KEYCLOAK_REALM: {
            type: 'string',
            default: 'entando-dev'
        },
        KEYCLOAK_AUTH_URL: {
            type: 'string',
            default: 'http://localhost:9080/auth'
        },
        KEYCLOAK_CLIENT_SECRET: {
            type: 'string',
            default: 'CFXd3zdoDgnSvLfovOvjFzpFkfnWfFar'
        },
        KEYCLOAK_CLIENT_ID: {
            type: 'string',
            default: 'entando-strapi-connector-ms-client'
        }
    }
}

const envOptions = {
    confKey: 'config', // optional, default: 'config'
    schema: envSchema,
}

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
            app.register(require('./routes/api/strapi-config'), strapiConfigOpts)
        }
    )

    return app
}

module.exports = build
