import fastifyPlugin from 'fastify-plugin'
import { asyncVerifyJWT, pubKeyVerifyJWT } from '../../plugins/auth.js'
import { appConstants } from '../../config/appConstants.js'
import strapiConfigDao from '../../db/dao.js'


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

    if (!configUrl) {
        errors.push({ field: "configUrl", errorCode: appConstants.ERR_MANDATORY})
    }
    if (!token) {
        errors.push({ field: "token", errorCode: appConstants.ERR_MANDATORY })
    }

    try {
        configUrl = new URL(configUrl)
    } catch (err) {
        fastify.log.warn(err)
        errors.push({ field: "configUrl", errorCode: appConstants.ERR_INVALID_URL })
    }

    const regex = /^\S+$/gm
    if (!regex.test(token)) {
        errors.push({ field: "token", errorCode: appConstants.ERR_INVALID_TOKEN })
    }

    if (errors.length > 0) {
        return reply.code(400).send({ status: 400, errors: errors })
    }

    try {
        const result = await fastify.saveConf(configUrl.toString(), token)
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
