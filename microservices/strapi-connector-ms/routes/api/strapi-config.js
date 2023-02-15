'use strict'

const getStrapiConfigHandler = (request, reply) => {
    reply.send({ url: 'https://my-strapi-instance.com/strapi' })
}

const strapiConfigSchema = {
    response: {
        200: {
            type: 'object',
            properties: {
                url: { type: 'string' }
            }
        }
    }
}

module.exports = async function (fastify, opts, done) {
    const getStrapiConfigOpts = {
        schema: strapiConfigSchema,
        handler: getStrapiConfigHandler
    }
    fastify.get('/api/strapi-config', getStrapiConfigOpts);
    done();
}

