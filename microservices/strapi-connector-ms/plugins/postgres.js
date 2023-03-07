import fastifyPlugin from 'fastify-plugin'
import fastifyPostgres from '@fastify/postgres'

async function dbConnector(fastify, opts) {
    const dbUrl = opts.SPRING_DATASOURCE_URL.slice(18)
    const connectionString = 'postgres://' + opts.SPRING_DATASOURCE_USERNAME + ":" + opts.SPRING_DATASOURCE_PASSWORD + "@" + dbUrl
    fastify.register(fastifyPostgres, { connectionString: connectionString })
}

export default fastifyPlugin(dbConnector)