import fastifyPlugin from 'fastify-plugin'
import got from 'got'
import { asyncVerifyJWT, pubKeyVerifyJWT } from '../../plugins/auth.js'
import { appConstants } from '../../config/appConstants.js'
import strapiConfigDao from '../../db/dao.js'
import { hasErrors, isDefined, checkUrl, checkToken, checkConfig } from '../../utils/strapiConfigUtils.js'


const getStrapiConfigHandler = async (request, reply) => {
    const fastify = request.server

    try {
        const result = await fastify.readConf()
        if (!result) return reply.code(404).send({ configUrl: null, token: false })
        return reply.code(200).send({ configUrl: result.base_url, token: true })
    } catch (err) {
        fastify.log.error(err)
        return reply.code(500).send(err)
    }
}

const postStrapiConfigHandler = async (request, reply) => {
    const fastify = request.server
    let errors = []
    let configUrl = request.body.configUrl
    const token = request.body.token

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

    if (!hasErrors(errors)) {
        try {
            await checkConfig(configUrl + appConstants.STRAPI_COMPONENTS_ENDPOINT, token)
            await checkConfig(configUrl + appConstants.STRAPI_CONTENT_TYPES_ENDPOINT, token)
            fastify.log.info(appConstants.TOKEN_VERIFY_SUCCESS)
        } catch (err) {
            fastify.log.warn(err.payload, err.message)
            errors.push(err.payload)
        }
    }

    if (hasErrors(errors)) {
        return reply.code(400).send({ status: 400, errors: errors })
    }

    try {
        const result = await fastify.saveConf(configUrl, token)
        return reply.code(201).send({ status: 201, configUrl: result.base_url, token: result.token, errors: null })
    } catch (err) {
        fastify.log.error(err)
        return reply.code(500).send(err)
    }
}

const deleteStrapiConfigHandler = async (request, reply) => {
    const fastify = request.server

    try {
        const result = await fastify.resetConf()
        if (!result) return reply.code(404).send()
        return reply.code(204).send()
    } catch (err) {
        fastify.log.error(err)
        return reply.code(500).send(err)
    }
}

async function strapiConfigRoutes (fastify, opts, done) {
    fastify.decorate('asyncVerifyJWT', asyncVerifyJWT)
    fastify.decorate('pubKeyVerifyJWT', pubKeyVerifyJWT)
    fastify.register(fastifyPlugin(strapiConfigDao))

    let authStrategy = fastify.asyncVerifyJWT
    if (fastify.config.JWT_PUB_KEY) {
        authStrategy = fastify.pubKeyVerifyJWT
    }
    fastify.get('/api/strapi/config', { handler: getStrapiConfigHandler/* , onRequest: authStrategy */ })
    fastify.post('/api/strapi/config', { handler: postStrapiConfigHandler,/*  onRequest: authStrategy */ })
    fastify.delete('/api/strapi/config', { handler: deleteStrapiConfigHandler,/*  onRequest: authStrategy */ })
    done()
}

export default strapiConfigRoutes
