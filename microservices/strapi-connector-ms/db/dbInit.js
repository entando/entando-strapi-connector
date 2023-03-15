import Postgrator from 'postgrator'

async function dbInit() {
    const fastify = this
    
    const client = fastify.pg
    const opts = fastify.config
    const db = opts.SPRING_DATASOURCE_URL.split("/").at(-1)
    const schema = opts.SPRING_DATASOURCE_USERNAME
    try {
        const postgrator = new Postgrator({
            migrationPattern: './db/*',
            driver: 'pg',
            database: db,
            schemaTable: 'migrations',
            currentSchema: schema,
            execQuery: (query) => client.query(query),
        });

        const result = await postgrator.migrate()

        if (result.length === 0) {
            fastify.log.debug("No DB migration necessary")
        } else {
            fastify.log.info("DB migration done")
        }
    } catch (error) {
        fastify.log.error(error)
    }
}

export default dbInit