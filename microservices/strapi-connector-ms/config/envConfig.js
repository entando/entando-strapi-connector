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
            // default: '/'
            default: '/entando-strapi-connector-3a731f89/strapi-connector-ms'
        },
        SPRING_DATASOURCE_USERNAME: {
            type: 'string',
            // default: 'entando-strapi-connector-user'
            default: 'pn_3a731f89_10a82d39_gpent_strapi_connector_ms'
        },
        SPRING_DATASOURCE_PASSWORD: {
            type: 'string',
            // default: 'entando-strapi-connector-password'
            default: '490eba868aeb4279'
        },
        SPRING_DATASOURCE_URL: {
            type: 'string',
            // default: 'jdbc:postgresql://localhost:5432/entando-strapi-connector'
            default: 'jdbc:postgresql://localhost:5432/default_postgresql_dbms_in_namespace_db'
        },
        STRAPI_CONFIG_TABLE: {
            type: 'string',
            default: 'strapi_url'
        },
        APP_ORIGIN: {
            type: 'string',
            default: 'http://localhost:3000'
            // default: 'http://giovanni.k8s-entando.org'
        },
        KEYCLOAK_REALM: {
            type: 'string',
            // default: 'entando-dev'
            default: 'entando'
        },
        KEYCLOAK_AUTH_URL: {
            type: 'string',
            // default: 'http://localhost:9080/auth'
            default: 'http://giovanni.k8s-entando.org/auth'
        },
        KEYCLOAK_CLIENT_SECRET: {
            type: 'string',
            // default: 'CFXd3zdoDgnSvLfovOvjFzpFkfnWfFar'
            default: 'HbVEF3xGu8IXHXvNkEJq4Sgco7FbVuAk'
        },
        KEYCLOAK_CLIENT_ID: {
            type: 'string',
            // default: 'entando-strapi-connector-ms-client'
            default: 'pn-3a731f89-10a82d39-gpent-strapi-connector-ms-server'
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
