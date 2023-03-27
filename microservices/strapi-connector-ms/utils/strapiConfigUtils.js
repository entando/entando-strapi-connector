import got from 'got'
import { appConstants } from '../config/appConstants.js'

export class VerifyException {
    constructor(payload, message) {
        this.name = "VerifyException"
        this.payload = payload
        this.message = message
    }
}

export function hasErrors(list) {
    return list.length > 0
}

export function isDefined(value) {
    if (value == undefined || value == null || value.trim() == "") {
        return false
    }
    return true
}

export function checkUrl(url) {
    try {
        //https://nodejs.org/api/url.html#class-url and https://url.spec.whatwg.org/#example-url-parsing
        new URL(url)
    } catch (err) {
        throw new VerifyException(
            { field: appConstants.CONFIGURL_FIELD_NAME, errorCode: appConstants.ERR_INVALID_URL },
            err.message
        )
    }
}

export function checkToken(token) {
    const regex = /^\S+$/gm
    if (!regex.test(token.trim())) {
        throw new VerifyException(
            { field: appConstants.TOKEN_FIELD_NAME, errorCode: appConstants.ERR_INVALID_TOKEN },
            appConstants.MSG_TOKEN_HAS_SPACES
        )
    }
}

export async function checkConfig(url, token) {
    const verifyOpts = {
        headers: {
            'Authorization': appConstants.BEARER + token,
        },
        retry: { limit: 1 }
    }
    // init the payload with the ERR_INVALID_URL error
    try {
        const body = await got.get(url, verifyOpts).json()
        // check if the data returned is the same we expected
        if (!(body['data'] || Array.isArray(body['data']))) {
            // if not, something is off (not a real strapi instance?)
            throw new VerifyException({ field: appConstants.CONFIGURL_FIELD_NAME, errorCode: appConstants.ERR_INVALID_URL }, appConstants.MSG_STRAPI_BAD_PAYLOAD)
        }
    } catch (err) {
        // check if the get worked but we got a 40* error
        if (err.code == appConstants.GOT_ERR_NON_2XX_3XX_RESPONSE) {
            // if Forbidden (403) the token is valid but it doesn't have the grants to list the resource
            // NOTE: strapi will respond with a 403 also if we try to call the endpoints
            //       WITHOUT the Authorization header sets but this will never happen here
            if (err.response.statusCode == appConstants.HTTP_CODE_FORBIDDEN) {
                throw new VerifyException({ field: appConstants.TOKEN_FIELD_NAME, errorCode: appConstants.ERR_TOKEN_PERMISSIONS }, err.message)
            }
            // if Unauthorized (401) the token is just wrong
            if (err.response.statusCode == appConstants.HTTP_CODE_UNAUTHORIZED) {
                throw new VerifyException({ field: appConstants.TOKEN_FIELD_NAME, errorCode: appConstants.ERR_INVALID_TOKEN }, err.message)
            }
        }
        // every other error (50*/time out/connection problems) returns the ERR_INVALID_URL payload
        throw new VerifyException({ field: appConstants.CONFIGURL_FIELD_NAME, errorCode: appConstants.ERR_INVALID_URL }, err.message)
    }
}