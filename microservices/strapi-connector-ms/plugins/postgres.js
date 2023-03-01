const fastifyPlugin = require('fastify-plugin')

module.exports = fastifyPlugin(async function (fastify, opts, done) {
    const dbUrl = opts.SPRING_DATASOURCE_URL.slice(18)
    const connectionString = 'postgres://' + opts.SPRING_DATASOURCE_USERNAME + ":" + opts.SPRING_DATASOURCE_PASSWORD + "@" + dbUrl
    fastify.register(require('@fastify/postgres'), {
        connectionString: connectionString
    })
    done()
})