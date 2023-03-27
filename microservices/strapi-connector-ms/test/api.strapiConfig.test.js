import { vi, test, expect, beforeEach, afterAll, beforeAll } from 'vitest'
import buildApp from '../app.js'
import { appConstants } from '../config/appConstants.js'
import got from 'got'
import * as strapiConfigUtils from '../utils/strapiConfigUtils.js'

const validToken = "91686a19b414db8f3af24429"
const validUrl = "https://mystrapi.com/api"
let app

beforeAll(async () => {
    console.log("**************************************************")
    console.log("* These tests need a running PostgreSQL instance *")
    console.log("* change the test/.env.test file to configure it *")
    console.log("**************************************************")
    app = buildApp()
    await app.ready()
})

beforeEach(async () => {
    vi.clearAllMocks()
})

afterAll(async () => {
    try {
        await app.inject({
            method: 'DELETE',
            url: '/api/strapi/config'
        })
    } catch (err) {}
    await app.close()
})

test('GET /api/strapi/config should return 404', async () => {
    const expectedResponse = {
        configUrl: null,
        token: false
    }
    const response = await app.inject({
        method: 'GET',
        url: '/api/strapi/config'
    })

    expect(response.statusCode).toEqual(appConstants.HTTP_CODE_NOT_FOUND)
    expect(response.json()).toEqual(expectedResponse)
})

test('DELETE /api/strapi/config should return 404', async () => {
    const response = await app.inject({
        method: 'DELETE',
        url: '/api/strapi/config'
    })

    expect(response.statusCode).toEqual(appConstants.HTTP_CODE_NOT_FOUND)
    expect(response.body).toBeFalsy()
})

test('POST /api/strapi/config should return 400 if mandatory fields are empty or missing', async () => {
    const payload = {
        configUrl: "",
        tokenWrongFieldName: "thisIsAValidToken"
    }

    const expectedResponse = {
        status: appConstants.HTTP_CODE_BAD_REQUEST,
        errors: [
            {
                field: appConstants.CONFIGURL_FIELD_NAME,
                errorCode: appConstants.ERR_MANDATORY
            },
            {
                field: appConstants.TOKEN_FIELD_NAME,
                errorCode: appConstants.ERR_MANDATORY
            }
        ],
        configUrl: "",
        token: null
    }

    const response = await app.inject({
        method: 'POST',
        url: '/api/strapi/config',
        body: payload
    })

    expect(response.statusCode).toEqual(appConstants.HTTP_CODE_BAD_REQUEST)
    expect(response.json()).toEqual(expectedResponse)
})

test('POST /api/strapi/config should return 400 if fields contain invalid values', async () => {
    const payload = {
        configUrl: "not a valid url", // not an url, duh
        token: "not a valid token" //has spaces
    }

    const expectedResponse = {
        status: appConstants.HTTP_CODE_BAD_REQUEST,
        errors: [
            {
                field: appConstants.CONFIGURL_FIELD_NAME,
                errorCode: appConstants.ERR_INVALID_URL
            },
            {
                field: appConstants.TOKEN_FIELD_NAME,
                errorCode: appConstants.ERR_INVALID_TOKEN
            }
        ],
        configUrl: "not a valid url",
        token: "not a valid token"
    }

    const response = await app.inject({
        method: 'POST',
        url: '/api/strapi/config',
        body: payload
    })

    expect(response.statusCode).toEqual(appConstants.HTTP_CODE_BAD_REQUEST)
    expect(response.json()).toEqual(expectedResponse)
})

test('POST /api/strapi/config should return 400 if Strapi instance returns unexpected payload', async () => {
    const payload = {
        configUrl: validUrl,
        token: validToken
    }

    const expectedResponse = {
        status: appConstants.HTTP_CODE_BAD_REQUEST,
        errors: [
            {
                field: appConstants.CONFIGURL_FIELD_NAME,
                errorCode: appConstants.ERR_INVALID_URL
            }
        ],
        configUrl: validUrl,
        token: validToken
    }

    const spy = vi.spyOn(got, 'get')
    spy.mockImplementation(() => {
        return { body: {} }
    })

    const response = await app.inject({
        method: 'POST',
        url: '/api/strapi/config',
        body: payload
    })

    expect(spy).toHaveBeenCalledTimes(1)
    expect(response.statusCode).toEqual(appConstants.HTTP_CODE_BAD_REQUEST)
    expect(response.json()).toEqual(expectedResponse)
})

test('POST /api/strapi/config should return 400 if Strapi instance returns 403 error code', async () => {
    const payload = {
        configUrl: validUrl,
        token: validToken
    }

    const expectedResponse = {
        status: appConstants.HTTP_CODE_BAD_REQUEST,
        errors: [
            {
                field: appConstants.TOKEN_FIELD_NAME,
                errorCode: appConstants.ERR_TOKEN_PERMISSIONS
            }
        ],
        configUrl: validUrl,
        token: validToken
    }

    const spy = vi.spyOn(got, 'get')
    spy.mockImplementation(() => {
        let err = new Error()
        err.code = appConstants.GOT_ERR_NON_2XX_3XX_RESPONSE
        err.response = {
            statusCode: appConstants.HTTP_CODE_FORBIDDEN
        }
        throw err
    })

    const response = await app.inject({
        method: 'POST',
        url: '/api/strapi/config',
        body: payload
    })

    expect(spy).toHaveBeenCalledTimes(1)
    expect(response.statusCode).toEqual(appConstants.HTTP_CODE_BAD_REQUEST)
    expect(response.json()).toEqual(expectedResponse)
})

test('POST /api/strapi/config should return 400 if Strapi instance returns 401 error code', async () => {
    const payload = {
        configUrl: validUrl,
        token: validToken
    }

    const expectedResponse = {
        status: appConstants.HTTP_CODE_BAD_REQUEST,
        errors: [
            {
                field: appConstants.TOKEN_FIELD_NAME,
                errorCode: appConstants.ERR_INVALID_TOKEN
            }
        ],
        configUrl: validUrl,
        token: validToken
    }

    const spy = vi.spyOn(got, 'get')
    spy.mockImplementation(() => {
        let err = new Error()
        err.code = appConstants.GOT_ERR_NON_2XX_3XX_RESPONSE
        err.response = {
            statusCode: appConstants.HTTP_CODE_UNAUTHORIZED
        }
        throw err
    })

    const response = await app.inject({
        method: 'POST',
        url: '/api/strapi/config',
        body: payload
    })

    expect(spy).toHaveBeenCalledTimes(1)
    expect(response.statusCode).toEqual(appConstants.HTTP_CODE_BAD_REQUEST)
    expect(response.json()).toEqual(expectedResponse)
})

test('POST /api/strapi/config should return 201', async () => {
    const payload = {
        configUrl: validUrl,
        token: validToken
    }

    const expectedResponse = {
        status: appConstants.HTTP_CODE_CREATED,
        errors: null,
        configUrl: validUrl,
        token: validToken
    }

    const spy = vi.spyOn(strapiConfigUtils, 'checkConfig')
    spy.mockImplementation(() => {})

    const response = await app.inject({
        method: 'POST',
        url: '/api/strapi/config',
        body: payload
    })

    expect(spy).toHaveBeenCalledTimes(2)
    expect(response.statusCode).toEqual(appConstants.HTTP_CODE_CREATED)
    expect(response.json()).toEqual(expectedResponse)
})

test('GET /api/strapi/config should return 200', async () => {
    const expectedResponse = {
        configUrl: validUrl,
        token: true
    }
    const response = await app.inject({
        method: 'GET',
        url: '/api/strapi/config'
    })

    expect(response.statusCode).toEqual(appConstants.HTTP_CODE_OK)
    expect(response.json()).toEqual(expectedResponse)
})

test('DELETE /api/strapi/config should return 204', async () => {
    const response = await app.inject({
        method: 'DELETE',
        url: '/api/strapi/config'
    })

    expect(response.statusCode).toEqual(appConstants.HTTP_CODE_NO_CONTENT)
    expect(response.body).toBeFalsy()
})