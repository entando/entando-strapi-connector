import fastifyPlugin from 'fastify-plugin'
import * as authStrategies from '../../plugins/auth.js'
import { appConstants } from '../../config/appConstants.js'
import strapiConfigDao from '../../db/dao.js'
import { hasErrors, isDefined, checkUrl, checkToken, checkConfig } from '../../utils/strapiConfigUtils.js'


const getStrapiConfigHandler = async (request, reply) => {
    const fastify = request.server

    try {
        const result = await fastify.readConf()
        if (!result) return reply.code(404).send({ configUrl: null, token: false })
        return reply.code(appConstants.HTTP_CODE_OK).send({ configUrl: result.base_url, token: true })
    } catch (err) {
        fastify.log.error(err)
        return reply.code(appConstants.HTTP_CODE_INTERNAL_ERROR).send(err)
    }
}

const postStrapiConfigHandler = async (request, reply) => {
    const fastify = request.server
    let errors = []
    let configUrl = request.body.configUrl
    const token = request.body.token

    // check if configUrl and token are defined
    if (!isDefined(configUrl)) {
        const payload = { field: appConstants.CONFIGURL_FIELD_NAME, errorCode: appConstants.ERR_MANDATORY }
        fastify.log.warn(payload)
        errors.push(payload)
    }
    if (!isDefined(token)) {
        const payload = { field: appConstants.TOKEN_FIELD_NAME, errorCode: appConstants.ERR_MANDATORY }
        fastify.log.warn(payload)
        errors.push(payload)
    }

    // check if configUrl and token are syntactically correct
    if (!hasErrors(errors)) {
        try {
            checkUrl(configUrl)
        } catch (err) {
            fastify.log.warn(err.payload, err.message)
            errors.push(err.payload)
        }

        try {
            checkToken(token)
        } catch (err) {
            fastify.log.warn(err.payload, err.message)
            errors.push(err.payload)
        }
    }

    // check if configUrl and token can access a strapi API
    if (!hasErrors(errors)) {
        try {
            await checkConfig(configUrl + appConstants.STRAPI_COMPONENTS_ENDPOINT, token)
            await checkConfig(configUrl + appConstants.STRAPI_CONTENT_TYPES_ENDPOINT, token)
            fastify.log.info(appConstants.MSG_TOKEN_VERIFY_SUCCESS)
        } catch (err) {
            fastify.log.warn(err.payload, err.message)
            errors.push(err.payload)
        }
    }

    if (hasErrors(errors)) {
        return reply.code(appConstants.HTTP_CODE_BAD_REQUEST).send({ status: appConstants.HTTP_CODE_BAD_REQUEST, errors: errors })
    }

    try {
        const result = await fastify.saveConf(configUrl, token)
        return reply.code(appConstants.HTTP_CODE_CREATED).send({ status: appConstants.HTTP_CODE_CREATED, configUrl: result.base_url, token: result.token, errors: null })
    } catch (err) {
        fastify.log.error(err)
        return reply.code(appConstants.HTTP_CODE_INTERNAL_ERROR).send(err)
    }
}

const deleteStrapiConfigHandler = async (request, reply) => {
    const fastify = request.server

    try {
        const result = await fastify.resetConf()
        if (!result) return reply.code(appConstants.HTTP_CODE_NOT_FOUND).send()
        return reply.code(appConstants.HTTP_CODE_NO_CONTENT).send()
    } catch (err) {
        fastify.log.error(err)
        return reply.code(appConstants.HTTP_CODE_INTERNAL_ERROR).send(err)
    }
}

async function strapiConfigRoutes (fastify, opts, done) {
    fastify.register(fastifyPlugin(strapiConfigDao))

    if (fastify.config.AUTH_ENABLED) {
        let authStrategy = authStrategies.asyncVerifyJWT
        if (fastify.config.JWT_PUB_KEY) {
            fastify.log.info('Using public key for JWT verification: ' + fastify.config.JWT_PUB_KEY)
        } else {
            authStrategy = authStrategies.pubKeyVerifyJWT
            fastify.config.USER_ENDPOINT = fastify.config.KEYCLOAK_AUTH_URL + "/realms/" + fastify.config.KEYCLOAK_REALM + appConstants.KEYCLOAK_USERINFO_ENDPOINT
            fastify.log.info('Using introspection endpoint for JWT verification: ' + fastify.config.USER_ENDPOINT)
        }
        fastify.addHook('onRequest', authStrategy)
    }

    fastify.get(appConstants.STRAPI_CONFIG_ENDPOINT, { handler: getStrapiConfigHandler })
    fastify.post(appConstants.STRAPI_CONFIG_ENDPOINT, { handler: postStrapiConfigHandler })
    fastify.delete(appConstants.STRAPI_CONFIG_ENDPOINT, { handler: deleteStrapiConfigHandler })
    done()
}

export default strapiConfigRoutes
