import { asyncVerifyJWT, pubKeyVerifyJWT } from '../../plugins/auth.js'

const getStrapiConfigsHandler = (request, reply) => {
    const fastify = request.server
    fastify.pg.connect(onConnect)
    function onConnect(err, client, release) {
        if (err) return reply.send(err)
        client.query(
            "SELECT * FROM " + fastify.config.SPRING_DATASOURCE_USERNAME + "." + fastify.config.STRAPI_CONFIG_TABLE,
            function onResult(err, result) {
                release()
                if (err) return reply.code(500).send(err)
                return reply.code(200).send(result.rows)
            }
        )
    }
}

const getStrapiConfigHandler = (request, reply) => {
    const fastify = request.server
    fastify.pg.connect(onConnect)
    function onConnect(err, client, release) {
        if (err) return reply.send(err)
        client.query(
            "SELECT * FROM " + fastify.config.SPRING_DATASOURCE_USERNAME + "." + fastify.config.STRAPI_CONFIG_TABLE + " WHERE id = $1",
            [request.params.id],
            function onResult(err, result) {
                release()
                if (err) return reply.code(500).send(err)
                if (result.rows.length == 0) return reply.code(404)
                return reply.code(200).send(result.rows[0])
            }
        )
    }
}

const postStrapiConfigHandler = (request, reply) => {
    const fastify = request.server
    fastify.pg.connect(onConnect)
    function onConnect(err, client, release) {
        if (err) return reply.send(err)
        console.log(request.body.url)
        client.query(
            "INSERT INTO " + fastify.config.SPRING_DATASOURCE_USERNAME + "." + fastify.config.STRAPI_CONFIG_TABLE + "(url) VALUES($1) RETURNING id, url",
            [request.body.url],
            function onResult(err, result) {
                release()
                if (err) return reply.code(500).send(err)
                return reply.code(201).send(result.rows[0])
            }
        )
    }
}

const putStrapiConfigHandler = (request, reply) => {
    const fastify = request.server
    fastify.pg.connect(onConnect)
    function onConnect(err, client, release) {
        if (err) return reply.send(err)
        client.query(
            "UPDATE " + fastify.config.SPRING_DATASOURCE_USERNAME + "." + fastify.config.STRAPI_CONFIG_TABLE + " SET url = $1 WHERE id = $2 RETURNING id, url",
            [request.body.url, request.params.id],
            function onResult(err, result) {
                release()
                if (err) return reply.code(500).send(err)
                return reply.code(200).send(result.rows[0])
            }
        )
    }
}

const deleteStrapiConfigHandler = (request, reply) => {
    const fastify = request.server
    fastify.pg.connect(onConnect)
    function onConnect(err, client, release) {
        if (err) return reply.send(err)
        client.query(
            "DELETE FROM " + fastify.config.SPRING_DATASOURCE_USERNAME + "." + fastify.config.STRAPI_CONFIG_TABLE + " WHERE id = $1",
            [request.params.id],
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
        console.log(authStrategy)
    }
    fastify.get('/api/strapi-config', { handler: getStrapiConfigsHandler, onRequest: authStrategy })
    fastify.get('/api/strapi-config/:id', {handler: getStrapiConfigHandler})
    fastify.post('/api/strapi-config', {handler: postStrapiConfigHandler})
    fastify.put('/api/strapi-config/:id', {handler: putStrapiConfigHandler})
    fastify.delete('/api/strapi-config/:id', {handler: deleteStrapiConfigHandler})
    done()
}

export default strapiConfigRoutes
