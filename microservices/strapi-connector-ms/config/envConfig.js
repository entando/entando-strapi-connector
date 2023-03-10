const envSchema = {
    type: 'object',
    required: ['SERVER_SERVLET_CONTEXT_PATH',
        'SPRING_DATASOURCE_USERNAME',
        'SPRING_DATASOURCE_PASSWORD',
        'SPRING_DATASOURCE_URL',
        'APP_ORIGIN',
        'KEYCLOAK_REALM',
        'KEYCLOAK_AUTH_URL',
        'KEYCLOAK_CLIENT_SECRET',
        'KEYCLOAK_CLIENT_ID',
        'JWT_PUB_KEY'
    ],
    properties: {
        SERVER_SERVLET_CONTEXT_PATH: {
            type: 'string',
            default: '/'
        },
        SPRING_DATASOURCE_USERNAME: {
            type: 'string',
            default: 'entando-strapi-connector-user'
        },
        SPRING_DATASOURCE_PASSWORD: {
            type: 'string',
            default: 'entando-strapi-connector-password'
        },
        SPRING_DATASOURCE_URL: {
            type: 'string',
            default: 'jdbc:postgresql://localhost:5432/entando-strapi-connector'
        },
        STRAPI_CONFIG_TABLE: {
            type: 'string',
            default: 'strapi_url'
        },
        APP_ORIGIN: {
            type: 'string',
            default: 'http://localhost:3000'
        },
        KEYCLOAK_REALM: {
            type: 'string',
            default: 'entando-dev'
        },
        KEYCLOAK_AUTH_URL: {
            type: 'string',
            default: 'http://localhost:9080/auth'
        },
        KEYCLOAK_CLIENT_SECRET: {
            type: 'string',
            default: 'CFXd3zdoDgnSvLfovOvjFzpFkfnWfFar'
        },
        KEYCLOAK_CLIENT_ID: {
            type: 'string',
            default: 'entando-strapi-connector-ms-client'
        },
        JWT_PUB_KEY :{
            type: 'string',
            default: ''
        }
    }
}

export const envOptions = {
    confKey: 'config', // optional, default: 'config'
    schema: envSchema,
}
