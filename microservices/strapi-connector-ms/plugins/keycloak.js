const fastifyPlugin = require('fastify-plugin')
const keycloak = require('fastify-keycloak-adapter')

module.exports = fastifyPlugin(async function (fastify, opts, done) {
    const keycloakUrl = opts.KEYCLOAK_AUTH_URL + '/realms/' + opts.KEYCLOAK_REALM
    const kyecloakOpts = {
        appOrigin: opts.APP_ORIGIN,
        keycloakSubdomain: keycloakUrl.replace("http://", "").replace("https://", ""),
        clientId: opts.KEYCLOAK_CLIENT_ID,
        clientSecret: opts.KEYCLOAK_CLIENT_SECRET
    }
    fastify.register(keycloak, kyecloakOpts)
    done()
})