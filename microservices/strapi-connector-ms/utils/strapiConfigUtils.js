import got from 'got'
import { appConstants } from '../config/appConstants.js'

class VerifyException {
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
        new URL(url)
    } catch (err) {
        throw new VerifyException(
            { field: appConstants.CONFIGURL_FIELD_NAME, errorCode: appConstants.ERR_MALFORMED_URL },
            err.message
        )
    }
}

export function checkToken(token) {
    const regex = /^\S+$/gm
    if (!regex.test(token.trim())) {
        throw new VerifyException(
            { field: appConstants.TOKEN_FIELD_NAME, errorCode: appConstants.ERR_MALFORMED_TOKEN },
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
    try {
        const body = await got.get(url, verifyOpts).json()
        console.log(typeof body)
        if (!(body['data'] || Array.isArray(body['data']))) {
            let payload = { field: appConstants.CONFIGURL_FIELD_NAME, errorCode: appConstants.ERR_INVALID_URL }
            throw new VerifyException(payload, appConstants.MSG_STRAPI_BAD_PAYLOAD)
        }
    } catch (err) {
        let payload = { field: appConstants.CONFIGURL_FIELD_NAME, errorCode: appConstants.ERR_INVALID_URL }
        if (err.code == appConstants.GOT_ERR_NON_2XX_3XX_RESPONSE) {
            payload = { field: appConstants.TOKEN_FIELD_NAME, errorCode: appConstants.ERR_INVALID_TOKEN }
        }
        throw new VerifyException(payload, err.message)
    }
}