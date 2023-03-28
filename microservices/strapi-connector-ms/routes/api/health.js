import { appConstants } from "../../config/appConstants.js"

const getHealthHandler = async (request, reply, opts) => {
  const fastify = request.server
  const queryString = "SELECT COUNT (*) FROM " + fastify.config.SPRING_DATASOURCE_USERNAME + "." + fastify.config.API_CONFIG_TABLE
  const pool = fastify.pg

  try {
    await pool.query(queryString)
    reply.code(appConstants.HTTP_CODE_OK).send({ status: { server: "UP", db: "UP" }, error: null })
  } catch (err) {
    fastify.log.error(err)
    reply.code(appConstants.HTTP_CODE_SERVICE_UNAVAILABLE).send({ status: { server: "UP", db: "DOWN" }, error: err })
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
        },
        error: {
          type: 'object',
          nullable: true
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

