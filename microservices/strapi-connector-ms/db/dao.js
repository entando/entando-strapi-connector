import { appConstants } from '../config/appConstants.js'

async function strapiConfigDao(fastify, opts) {
    const whereCondition = " WHERE application_name = $1"
    const applicationName = appConstants.APPLICATION_NAME
    const tableName = fastify.config.SPRING_DATASOURCE_USERNAME + "." + fastify.config.API_CONFIG_TABLE
    const pool = fastify.pg

    async function getStrapiConfig() {
        const queryString = "SELECT * FROM " + tableName + whereCondition
        const result = await pool.query(queryString, [applicationName])
        if (result.rows.length == 0) return null
        return result.rows[0]
    }

    async function postStrapiConfig(url, token) {
        const queryString = "INSERT INTO " + tableName + "(application_name, base_url, token) VALUES($1, $2, $3) ON CONFLICT ON CONSTRAINT api_config_appname DO UPDATE SET base_url = EXCLUDED.base_url, token = EXCLUDED.token RETURNING base_url, token"
        const result = await pool.query(queryString, [applicationName, url, token])
        return result.rows[0]
    }

    async function resetStrapiConfig() {
        const queryString = "DELETE FROM " + tableName + whereCondition
        const result = await pool.query(queryString, [applicationName])
        if (result.rowCount == 0) return false
        return true
    }

    fastify.decorate('readConf', getStrapiConfig)
    fastify.decorate('saveConf', postStrapiConfig)
    fastify.decorate('resetConf', resetStrapiConfig)
}

export default strapiConfigDao