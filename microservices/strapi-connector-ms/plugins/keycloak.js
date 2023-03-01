const fastifyPlugin = require('fastify-plugin')
const keycloak = require('fastify-keycloak-adapter')

module.exports = fastifyPlugin(async function (fastify, opts, done) {
    const keycloakUrl = opts.KEYCLOAK_AUTH_URL + '/realms/' + opts.KEYCLOAK_REALM
    var appOrigin = opts.APP_ORIGIN
    var excludedPaths = []
    if (opts.SERVER_SERVLET_CONTEXT_PATH && opts.SERVER_SERVLET_CONTEXT_PATH != '/' ) {
        appOrigin = opts.APP_ORIGIN + opts.SERVER_SERVLET_CONTEXT_PATH
        excludedPaths.push(opts.SERVER_SERVLET_CONTEXT_PATH + "/connect/*")
    }
    const kyecloakOpts = {
        appOrigin: appOrigin,
        keycloakSubdomain: keycloakUrl.replace("http://", "").replace("https://", ""),
        clientId: opts.KEYCLOAK_CLIENT_ID,
        clientSecret: opts.KEYCLOAK_CLIENT_SECRET,
        excludedPatterns: excludedPaths
    }
    fastify.register(keycloak, kyecloakOpts)
    done()
})