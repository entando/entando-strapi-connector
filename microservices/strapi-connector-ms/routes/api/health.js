'use strict'

const getHealthHandler = (request, reply) => {

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
        'SELECT 1',
        function onResult(err, result) {
          release()
          if (err) status.db = "DOWN"
        }
      )
    }
  }
  if (status.db == "DOWN") reply.code(503).send(status)
  reply.send({status})
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
  done();
}

