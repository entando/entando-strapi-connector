// import fastifyPlugin from 'fastify-plugin'
import { Liquibase, LiquibaseLogLevels, POSTGRESQL_DEFAULT_CONFIG } from 'liquibase';


async function dbInit(opts) {
    const initConfig = {
        ...POSTGRESQL_DEFAULT_CONFIG,
        changeLogFile: './db/db-init.xml',
        url: opts.SPRING_DATASOURCE_URL,
        username: opts.SPRING_DATASOURCE_USERNAME,
        password: opts.SPRING_DATASOURCE_PASSWORD,
        liquibaseSchemaName: opts.SPRING_DATASOURCE_USERNAME,
        logLevel: LiquibaseLogLevels.Warning,
    }

    const instance = new Liquibase(initConfig);

    await instance.status()
    await instance.update()
}

export default dbInit
