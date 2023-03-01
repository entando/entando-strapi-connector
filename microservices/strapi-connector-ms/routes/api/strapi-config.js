'use strict'

const getStrapiConfigsHandler = (request, reply) => {
    const fastify = request.server
    fastify.pg.connect(onConnect)
    function onConnect(err, client, release) {
        if (err) return reply.send(err)
        client.query(
            "SELECT * FROM strapi_config.strapi_url",
            function onResult(err, result) {
                release()
                if (err) reply.code(500).send(err)
                reply.code(200).send(result.rows)
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
            "SELECT * FROM strapi_config.strapi_url WHERE id = $1",
            [request.params.id],
            function onResult(err, result) {
                release()
                if (err) reply.code(500).send(err)
                if (result.rows.length == 0) reply.code(404)
                reply.code(200).send(result.rows[0])
            }
        )
    }
}

const postStrapiConfigHandler = (request, reply) => {
    const fastify = request.server
    fastify.pg.connect(onConnect)
    function onConnect(err, client, release) {
        if (err) return reply.send(err)
        client.query(
            "INSERT INTO strapi_config.strapi_url(url) VALUES('$1') RETURNING id, url",
            [request.body.url],
            function onResult(err, result) {
                release()
                if (err) reply.code(500).send(err)
                reply.code(201).send(result.rows[0])
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
            "UPDATE strapi_config.strapi_url SET url = $1 WHERE id = $2 RETURNING id, url",
            [request.body.url, request.params.id],
            function onResult(err, result) {
                release()
                if (err) reply.code(500).send(err)
                reply.code(200).send(result.rows[0])
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
            "DELETE FROM strapi_config.strapi_url WHERE id = $1",
            [request.params.id],
            function onResult(err, result) {
                release()
                if (err) reply.code(500).send(err)
                reply.code(204).send()
            }
        )
    }
}

module.exports = async function (fastify, opts, done) {
    fastify.register(require('../../plugins/keycloak'), fastify.config)
    fastify.get('/api/strapi-config', { handler: getStrapiConfigsHandler })
    fastify.get('/api/strapi-config/:id', {handler: getStrapiConfigHandler})
    fastify.post('/api/strapi-config', {handler: postStrapiConfigHandler})
    fastify.put('/api/strapi-config/:id', {handler: putStrapiConfigHandler})
    fastify.delete('/api/strapi-config/:id', {handler: deleteStrapiConfigHandler})
    done()
}

