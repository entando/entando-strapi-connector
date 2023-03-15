import { asyncVerifyJWT, pubKeyVerifyJWT } from '../../plugins/auth.js'
import { appConstants } from '../../config/appConstants.js'


const getStrapiConfigHandler = (request, reply) => {
    const queryString = "SELECT * FROM " + fastify.config.SPRING_DATASOURCE_USERNAME + "." + fastify.config.STRAPI_CONFIG_TABLE + " WHERE application_name = $1"
    const fastify = request.server
    fastify.pg.connect(onConnect)
    function onConnect(err, client, release) {
        if (err) return reply.send(err)
        client.query(
            queryString,
            [appConstants.APPLICATION_NAME],
            function onResult(err, result) {
                release()
                if (err) return reply.code(500).send(err)
                if (result.rows.length == 0) return reply.code(404).send({ configUrl: null, token: false })
                return reply.code(200).send({ configUrl: result.rows[0].base_url, token: true })
            }
        )
    }
}

const postStrapiConfigHandler = (request, reply) => {
    let errors = []
    if (!request.body.configUrl) {
        errors.push({ field: "configUrl", errorCode: appConstants.ERR_MANDATORY})
    }
    if (!request.body.token) {
        errors.push({ field: "token", errorCode: appConstants.ERR_MANDATORY })
    }
    if (errors.length > 0) {
        return reply.code(400).send({status: 400, errors: errors})
    }
    const queryString = "INSERT INTO " + fastify.config.SPRING_DATASOURCE_USERNAME + "." + fastify.config.STRAPI_CONFIG_TABLE + "(application_name, base_url, token) VALUES($1, $2, $3) ON CONFLICT ON CONSTRAINT api_config_appname DO UPDATE SET base_url = EXCLUDED.base_url, token = EXCLUDED.token RETURNING base_url, token"
    const fastify = request.server
    fastify.pg.connect(onConnect)
    function onConnect(err, client, release) {
        if (err) return reply.send(err)
        client.query(
            queryString,
            [appConstants.APPLICATION_NAME, request.body.configUrl, request.body.token],
            function onResult(err, result) {
                release()
                if (err) return reply.code(500).send(err)
                return reply.code(201).send({ status: 201, configUrl: result.rows[0].base_url, token: result.rows[0].token, errors: null })
            }
        )
    }
}

const deleteStrapiConfigHandler = (request, reply) => {
    const fastify = request.server
    const queryString = "DELETE FROM " + fastify.config.SPRING_DATASOURCE_USERNAME + "." + fastify.config.STRAPI_CONFIG_TABLE + " WHERE application_name = $1"
    fastify.pg.connect(onConnect)
    function onConnect(err, client, release) {
        if (err) return reply.send(err)
        client.query(
            queryString,
            [appConstants.APPLICATION_NAME],
            function onResult(err, result) {
                release()
                if (err) return reply.code(500).send(err)
                return reply.code(204).send()
            }
        )
    }
}

async function strapiConfigRoutes (fastify, opts, done) {
    fastify.decorate('asyncVerifyJWT', asyncVerifyJWT)
    fastify.decorate('pubKeyVerifyJWT', pubKeyVerifyJWT)
    let authStrategy = fastify.asyncVerifyJWT
    if (fastify.config.JWT_PUB_KEY) {
        authStrategy = fastify.pubKeyVerifyJWT
    }
    fastify.get('/api/strapi/config', { handler: getStrapiConfigHandler })
    fastify.post('/api/strapi/config', {handler: postStrapiConfigHandler})
    fastify.delete('/api/strapi/config', {handler: deleteStrapiConfigHandler})
    done()
}

export default strapiConfigRoutes
