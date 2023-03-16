import got from 'got'
import { createVerifier, TOKEN_ERROR_CODES } from 'fast-jwt'

export async function asyncVerifyJWT (request, reply, done) {
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
        return reply.code(400).send({ "error": "missing_header", "error_description": "Authorization header not set" })
    }
}

export function pubKeyVerifyJWT(request, reply, done) {
    const fastify = request.server

    const pemHeader = "-----BEGIN CERTIFICATE-----\n"
    const pemFooter = "\n-----END CERTIFICATE-----"
    const pubKeyString = fastify.config.JWT_PUB_KEY

    const pubKey = pemHeader.concat(pubKeyString, pemFooter)
    const authHeader = request.headers.authorization
    if (authHeader && authHeader.split(' ')[0].toLowerCase() == 'bearer') {
        const token = authHeader.split(' ')[1]
        request.log.debug({ token: token }, { pubKey: pubKey }, "pubKeyVerifyJWT")
        try {
            const verifySync = createVerifier({ key: pubKey })
            verifySync(token)
            done()
        } catch (err) {
            let statusCode = 400
            fastify.log.warn({code: err.code}, err.message)
            if (err.code == 'FAST_JWT_EXPIRED') {
                statusCode = 401
            }
            return reply.code(statusCode).send({ "error": err.code, "error_description": err.message })
        }
    } else {
        return reply.code(400).send({ "error": "missing_header", "error_description": "Authorization header not set" })
    }
}
