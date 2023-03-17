const getHealthHandler = (request, reply, opts) => {

  var status = {
    server: "UP",
    db: "UP"
  }

  const fastify = request.server

  try {
    fastify.pg.query(
      "SELECT COUNT (*) FROM " + fastify.config.SPRING_DATASOURCE_USERNAME + "." + fastify.config.API_CONFIG_TABLE,
      function onResult(err, result) {
        if (err) {
          fastify.log.error(err)
          status.db = "DOWN"
          status.error = err
          reply.code(503).send({ status })
        } else {
          reply.send({ status })
        }
      }
    )
  } catch (err) {
    fastify.log.error(err)
    status.db = "DOWN"
    status.error = err
    reply.code(503).send({ status })
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
            server: { type: 'string' },
            db: { type: 'string' }
          }
        }
      }
    }
  }
}

async function getHealth(fastify, opts, done) {
  const getHealthOpts = {
    schema: healthSchema,
    handler: getHealthHandler
  }
  fastify.get('/api/health', getHealthOpts)
  done()
}

export default getHealth

