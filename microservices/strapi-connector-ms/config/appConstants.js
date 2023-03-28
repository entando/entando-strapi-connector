export const appConstants = {
    STRAPI_APPLICATION_NAME: "STRAPI",
    ERR_MANDATORY: "mandatory",
    ERR_INVALID_URL: "invalidConfigUrl",
    ERR_INVALID_TOKEN: "invalidToken",
    ERR_TOKEN_PERMISSIONS: "invalidTokenPermissions",
    STRAPI_CONFIG_ENDPOINT: "/api/strapi/config",
    STRAPI_CONTENT_TYPES_ENDPOINT: "/content-type-builder/content-types",
    STRAPI_COMPONENTS_ENDPOINT: "/content-type-builder/components",
    KEYCLOAK_USERINFO_ENDPOINT: "/protocol/openid-connect/userinfo",
    GOT_ERR_NON_2XX_3XX_RESPONSE: "ERR_NON_2XX_3XX_RESPONSE",
    HTTP_CODE_OK: 200,
    HTTP_CODE_CREATED: 201,
    HTTP_CODE_NO_CONTENT: 204,
    HTTP_CODE_BAD_REQUEST: 400,
    HTTP_CODE_UNAUTHORIZED: 401,
    HTTP_CODE_FORBIDDEN: 403,
    HTTP_CODE_NOT_FOUND: 404,
    HTTP_CODE_INTERNAL_ERROR: 500,
    HTTP_CODE_SERVICE_UNAVAILABLE: 503,
    MSG_TOKEN_HAS_SPACES: "Token has spaces",
    MSG_TOKEN_VERIFY_SUCCESS: "Strapi config verified succesfully",
    MSG_STRAPI_BAD_PAYLOAD: "Bad endpoint data payload",
    MSG_BODY_NOT_DEFINED: "Request body is not defined",
    TOKEN_FIELD_NAME: "token",
    CONFIGURL_FIELD_NAME: "configUrl",
    AUTH_HEADER: "Authorization",
    BEARER: "Bearer ",
    PEM_HEADER: "-----BEGIN CERTIFICATE-----\n",
    PEM_FOOTER: "\n-----END CERTIFICATE-----"
}