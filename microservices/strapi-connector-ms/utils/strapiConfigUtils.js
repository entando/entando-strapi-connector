import got from 'got'
import { appConstants } from '../config/appConstants.js'

function VerifyException(payload, message) {
    this.name = "VerifyException"
    this.payload = payload
    this.message = message
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
            appConstants.TOKEN_HAS_SPACES
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
        await got.get(url, verifyOpts)
    } catch (err) {
        let payload = { field: appConstants.CONFIGURL_FIELD_NAME, errorCode: appConstants.ERR_INVALID_URL }
        if (err.code == appConstants.GOT_ERR_NON_2XX_3XX_RESPONSE) {
            payload = { field: appConstants.TOKEN_FIELD_NAME, errorCode: appConstants.ERR_INVALID_TOKEN }
        }
        throw new VerifyException(payload, err.message)
    }
}