import got from 'got'
import { createVerifier, TOKEN_ERROR_CODES } from 'fast-jwt'
import { appConstants } from '../config/appConstants.js'

export async function asyncVerifyJWT (request, reply) {
    const fastify = request.server

    const authHeader = request.headers.authorization
    if (authHeader) {
        request.log.debug({ header: authHeader }, { userEndpoint: fastify.config.USER_ENDPOINT }, "asyncVerifyJWT")
        try {
            await got(
                fastify.config.USER_ENDPOINT,
                { headers: { "Authorization": authHeader }}
            )
        } catch (err) {
            request.log.warn(err.response.body)
            return reply.code(err.response.statusCode).send(err.response.body)
        }
    } else {
        request.log.warn("asyncVerifyJWT: missing_header")
        return reply.code(appConstants.HTTP_CODE_BAD_REQUEST).send({ "error": "missing_header", "error_description": "Authorization header not set" })
    }
}

export function pubKeyVerifyJWT(request, reply, done) {
    const fastify = request.server

    const pubKeyString = fastify.config.JWT_PUB_KEY

    const pubKey = appConstants.PEM_HEADER.concat(pubKeyString, appConstants.PEM_FOOTER)
    const authHeader = request.headers.authorization
    if (authHeader && authHeader.split(' ')[0].trim().toLowerCase() == appConstants.BEARER.trim().toLowerCase()) {
        const token = authHeader.split(' ')[1]
        request.log.debug({ token: token }, { pubKey: pubKey }, "pubKeyVerifyJWT")
        try {
            const verifySync = createVerifier({ key: pubKey })
            verifySync(token)
            done()
        } catch (err) {
            let statusCode = appConstants.HTTP_CODE_BAD_REQUEST
            fastify.log.warn({code: err.code}, err.message)
            if (err.code == 'FAST_JWT_EXPIRED') {
                statusCode = appConstants.HTTP_CODE_UNAUTHORIZED
            }
            return reply.code(statusCode).send({ "error": err.code, "error_description": err.message })
        }
    } else {
        return reply.code(appConstants.HTTP_CODE_BAD_REQUEST).send({ "error": "missing_header", "error_description": "Authorization header not set" })
    }
}
