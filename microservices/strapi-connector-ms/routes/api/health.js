'use strict'

const getHealthHandler = (request, reply, opts) => {

  var status = {
    server: "UP",
    db: "UP"
  }

  const fastify = request.server
  fastify.pg.connect(onConnect)
  function onConnect(err, client, release) {
    if (err) {
      status.db = "DOWN"
    } else {
      client.query(
        "SELECT COUNT (*) FROM " + fastify.config.SPRING_DATASOURCE_USERNAME + "." + fastify.config.STRAPI_CONFIG_TABLE,
        function onResult(err, result) {
          release()
          if (err) {
            status.db = "DOWN"
          }
          if (status.db == "DOWN") {
            status.error = err
            reply.code(503).send({ status })
          } else {
            reply.send({ status })
          }
        }
      )
    }
  }
}

const healthSchema = {
  response: {
    200: {
      type: 'object',
      properties: {
        status: {
          type: 'object',
          properties: {
            server: { type: 'string'},
            db: { type: 'string' }
          }
        }
      }
    }
  }
}

module.exports = async function (fastify, opts, done) {
  const getHealthOpts = {
    schema: healthSchema,
    handler: getHealthHandler
  }
  fastify.get('/api/health', getHealthOpts)
  done()
}

